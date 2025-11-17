import { Batch, DoughConfig, DoughResult } from '../types';
import { FLOURS } from '../flours-constants';

// Assuming jsPDF is loaded from a CDN as per index.html
declare global {
  interface Window {
    jspdf: any;
  }
}

// A helper function to format dates
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Exports a batch to a JSON file and triggers a download.
 */
export const exportBatchToJSON = (batch: Batch, t: (key: string, options?: any) => string): void => {
  try {
    // Create a simplified and clean object for export
    const exportData = {
      name: batch.name,
      createdAt: batch.createdAt,
      style: t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: batch.doughConfig.recipeStyle }),
      rating: batch.rating,
      hydration: batch.doughConfig.hydration,
      flour: FLOURS.find(f => f.id === batch.doughConfig.flourId)?.name || 'N/A',
      yeast: `${batch.doughConfig.yeastPercentage}% (${t(`form.yeast_${batch.doughConfig.yeastType.toLowerCase()}`)})`,
      fermentationTechnique: batch.doughConfig.fermentationTechnique,
      totalDoughWeight: batch.doughResult?.totalDough,
      doughBalls: `${batch.doughConfig.numPizzas} x ${batch.doughConfig.doughBallWeight}g`,
      ingredients: batch.doughResult,
      notes: batch.notes,
      levainId: batch.doughConfig.levainId,
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    const safeName = batch.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const date = batch.createdAt.split('T')[0];
    a.href = url;
    a.download = `fornada-${date}-${safeName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to export batch to JSON:", error);
    throw new Error("Failed to generate JSON file.");
  }
};

/**
 * Generates a PDF from a batch and triggers a download.
 */
export const exportBatchToPDF = (batch: Batch, t: (key: string, options?: any) => string): void => {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let y = 20; // current y position
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const lineSpacing = 7;
        const sectionSpacing = 12;
        const col1 = 20;
        const col2 = 80;

        const checkPageBreak = (spaceNeeded: number = 20) => {
            if (y + spaceNeeded > pageHeight - margin) {
                doc.addPage();
                y = margin;
            }
        };

        // --- Header ---
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text(batch.name, margin, y);
        y += lineSpacing;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text(`Criado em: ${formatDate(batch.createdAt)}`, margin, y);
        y += sectionSpacing * 2;
        doc.setTextColor(0);

        // --- Resumo da Massa ---
        checkPageBreak();
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Resumo da Massa', margin, y);
        y += lineSpacing + 2;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const printRow = (label: string, value: string) => {
            checkPageBreak(lineSpacing);
            doc.setFont('helvetica', 'bold');
            doc.text(label, col1, y);
            doc.setFont('helvetica', 'normal');
            doc.text(value, col2, y);
            y += lineSpacing;
        };
        
        printRow('Estilo:', t(`form.${batch.doughConfig.recipeStyle.toLowerCase()}`, { defaultValue: batch.doughConfig.recipeStyle }));
        printRow('Hidratação:', `${batch.doughConfig.hydration}%`);
        printRow('Farinha:', FLOURS.find(f => f.id === batch.doughConfig.flourId)?.name || 'N/A');
        printRow('Fermento:', `${batch.doughConfig.yeastPercentage}% (${t(`form.yeast_${batch.doughConfig.yeastType.toLowerCase()}`)})`);
        y += sectionSpacing;

        // --- Ingredientes ---
        if (batch.doughResult) {
            checkPageBreak();
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Ingredientes', margin, y);
            y += lineSpacing + 2;

            const printIngredientRow = (label: string, value: number, note?: string) => {
                checkPageBreak(lineSpacing);
                doc.setFontSize(11);
                doc.setFont('helvetica', 'normal');
                doc.text(label, col1, y);
                doc.text(`${value.toFixed(1)}g`, col2, y, { align: 'left' });
                if (note) {
                    doc.setTextColor(150);
                    doc.text(note, 130, y, { align: 'left' });
                    doc.setTextColor(0);
                }
                y += lineSpacing;
            };

            const { doughResult, doughConfig } = batch;

            if (doughResult.preferment && doughResult.finalDough) {
                checkPageBreak();
                doc.setFont('helvetica', 'bold');
                doc.text(t(`form.${doughConfig.fermentationTechnique.toLowerCase()}`), col1, y);
                y += lineSpacing;
                printIngredientRow('Farinha', doughResult.preferment.flour);
                printIngredientRow('Água', doughResult.preferment.water);
                if (doughResult.preferment.yeast > 0) printIngredientRow('Fermento', doughResult.preferment.yeast);
                
                checkPageBreak();
                doc.setFont('helvetica', 'bold');
                doc.text('Massa Final', col1, y);
                y += lineSpacing;
                printIngredientRow(t(`form.${doughConfig.fermentationTechnique.toLowerCase()}`), doughResult.preferment.flour + doughResult.preferment.water + doughResult.preferment.yeast);
            }

            const ingredients = doughResult.finalDough || doughResult;
            const flourAmount = 'flour' in ingredients ? ingredients.flour : ingredients.totalFlour;
            const waterAmount = 'water' in ingredients ? ingredients.water : ingredients.totalWater;
            const saltAmount = 'salt' in ingredients ? ingredients.salt : ingredients.totalSalt;
            const oilAmount = 'oil' in ingredients ? ingredients.oil : ingredients.totalOil;
            const yeastAmount = 'yeast' in ingredients ? ingredients.yeast : ingredients.totalYeast;

            printIngredientRow('Farinha', flourAmount);
            printIngredientRow('Água', waterAmount);
            printIngredientRow('Sal', saltAmount, `${doughConfig.salt.toFixed(1)}%`);
            if (oilAmount > 0) printIngredientRow('Azeite/Óleo', oilAmount, `${doughConfig.oil.toFixed(1)}%`);
            if (yeastAmount > 0 && !doughResult.preferment) printIngredientRow('Fermento', yeastAmount);

            checkPageBreak();
            doc.setLineWidth(0.5);
            doc.line(col1, y, 180, y);
            y += lineSpacing;
            
            doc.setFont('helvetica', 'bold');
            printRow('Peso Total', `${doughResult.totalDough.toFixed(0)}g`);
        }
        y += sectionSpacing;

        // --- Notas ---
        if (batch.notes) {
            checkPageBreak(40);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Processo & Notas', margin, y);
            y += lineSpacing + 2;

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            const splitNotes = doc.splitTextToSize(batch.notes, 170);
            doc.text(splitNotes, margin, y);
        }
        
        const safeName = batch.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const date = batch.createdAt.split('T')[0];
        doc.save(`fornada-${date}-${safeName}.pdf`);

    } catch (error) {
        console.error("Failed to export batch to PDF:", error);
        throw new Error("Failed to generate PDF file.");
    }
};
