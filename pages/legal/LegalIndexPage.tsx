
import React, { useState } from 'react';
import { Page } from '../../types';
import { ChevronDownIcon } from '../../components/IconComponents';

// --- Placeholders for Company Data ---
const COMPANY_NAME = '[NOME DA EMPRESA]';
const COMPANY_ADDRESS = '[ENDEREÇO COMPLETO]';
const COMPANY_CITY_STATE = '[CIDADE/ESTADO]';
const LAST_UPDATED_DATE = '[dd/mm/aaaa]';

const sections = [
  { id: 'visao-geral', title: 'Visão Geral' },
  { id: 'termos-de-uso', title: 'Termos de Uso' },
  { id: 'politica-de-privacidade', title: 'Política de Privacidade' },
  { id: 'politica-de-cookies', title: 'Política de Cookies' },
  { id: 'eula', title: 'EULA' },
  { id: 'propriedade-intelectual', title: 'Propriedade Intelectual' },
  { id: 'contato-legal', title: 'Contato Legal' },
];

const LegalSection: React.FC<{ id: string, title: string, lastUpdated?: string, children: React.ReactNode }> = ({ id, title, lastUpdated, children }) => (
  <section id={id} className="mb-12 scroll-mt-24">
    <div className="border-b border-slate-200 pb-4">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {lastUpdated && (
        <p className="mt-2 text-sm text-slate-500">Última atualização: {lastUpdated}</p>
      )}
    </div>
    <div className="prose mt-6 max-w-none text-slate-600">
      {children}
    </div>
  </section>
);


const LegalIndexPage: React.FC<{ onNavigate: (page: Page) => void }> = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // A simplified handler for mobile navigation that closes the menu.
    const handleMobileNav = (id: string) => {
      setIsMobileMenuOpen(false);
      window.location.hash = `#legal#${id}`;
    };

    return (
        <div className="mx-auto max-w-7xl">
            {/* Mobile Header/Dropdown */}
            <div className="lg:hidden mb-6 relative">
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full flex items-center justify-between rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200/50 text-left"
                >
                    <span className="font-semibold">Navegar na página</span>
                    <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-2 z-10">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#/legal#${section.id}`}
                                onClick={(e) => { e.preventDefault(); handleMobileNav(section.id); }}
                                className="block w-full text-left rounded-md p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                {section.title}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block lg:col-span-1">
                    <nav className="sticky top-24 space-y-2">
                        {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#/legal#${section.id}`}
                            className="flex w-full items-center rounded-lg p-3 text-sm font-semibold transition-colors text-slate-600 hover:bg-slate-100"
                        >
                            <span className="truncate">{section.title}</span>
                        </a>
                        ))}
                    </nav>
                </aside>

                <main className="lg:col-span-3">
                    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 sm:p-10">
                        
                        <LegalSection id="visao-geral" title="Assuntos Legais">
                            <p>Esta área reúne os documentos que regulam o uso do DoughLabPro, a proteção dos seus dados, o uso de cookies, a licença do aplicativo e os canais para contato em questões jurídicas.</p>
                            <p>Recomendamos que você leia estes documentos com atenção antes de utilizar o aplicativo. Em caso de dúvidas, entre em contato pelo canal ‘Contato Legal’.</p>
                        </LegalSection>

                        <LegalSection id="termos-de-uso" title="Termos de Uso" lastUpdated={LAST_UPDATED_DATE}>
                            <h3>1. Objeto e Escopo</h3>
                            <p>O DoughLabPro é um aplicativo de apoio técnico para fermentação, panificação, pizzaria e massas em geral. Ele oferece ferramentas como calculadora de massas, tutoriais, histórico de fornadas, MyLab, banco de farinhas, sistemas de insights e assistente virtual (“Serviços”). Os Serviços têm caráter informativo e educacional, não constituindo consultoria profissional, nutricional ou médica.</p>
                            <h3>2. Elegibilidade</h3>
                            <p>O Usuário declara ser maior de 18 anos ou possuir autorização de responsável legal. Menores não devem utilizar o App sem supervisão.</p>
                            <h3>3. Conta do Usuário</h3>
                            <p>Para utilizar o App, pode ser necessário criar uma conta. O Usuário concorda em: fornecer informações corretas e atualizadas; manter a confidencialidade de suas credenciais; não compartilhar sua conta com terceiros. A Empresa pode suspender ou excluir contas que violem estes Termos.</p>
                            <h3>4. Licença de Uso</h3>
                            <p>Concedemos ao Usuário licença limitada, não exclusiva, intransferível e revogável para utilizar o App exclusivamente para fins pessoais. É proibido: descompilar, modificar ou realizar engenharia reversa; usar o App comercialmente sem autorização; copiar, distribuir ou reproduzir partes do App sem permissão.</p>
                            <h3>5. Conteúdo Gerado pelo Usuário (UGC)</h3>
                            <p>O Usuário pode inserir receitas, fotos, anotações e dados no MyLab. Ao fazê-lo, concede à Empresa licença mundial, gratuita, não exclusiva e revogável para armazenar, processar e exibir esse conteúdo dentro do App. O Usuário declara que: possui direitos sobre o conteúdo enviado; não publicará conteúdos ilícitos, ofensivos, discriminatórios ou que violem direitos autorais.</p>
                            <h3>6. Planos Pagos, Assinaturas e Renovações</h3>
                            <p>Se o App oferecer planos pagos, aplicam-se as seguintes regras: Assinaturas são cobradas pela loja oficial (Google Play, App Store ou web). Renovação automática ocorre até cancelamento pelo próprio Usuário. Reembolsos seguem políticas das lojas (Google/Apple) e da legislação aplicável.</p>
                            <h3>7. Limitação de Responsabilidade</h3>
                            <p>O Usuário reconhece que: massas, fermentação e panificação envolvem variáveis técnicas e ambientais; a Empresa não garante resultado específico, rendimento, sabor, textura ou desempenho final da massa. A Empresa não se responsabiliza por: danos indiretos, lucros cessantes ou prejuízos culinários; falhas decorrentes de uso inadequado do App; indisponibilidade temporária do Serviço. Os Serviços são fornecidos “tal como estão” e “conforme disponibilidade”.</p>
                            <h3>8. Modificações</h3>
                            <p>Podemos alterar estes Termos a qualquer momento. As alterações entram em vigor 30 dias após publicação. Se o Usuário continuar utilizando o App, considera-se que aceitou as mudanças.</p>
                            <h3>9. Lei Aplicável e Foro</h3>
                            <p>Os Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de {COMPANY_CITY_STATE} para resolução de conflitos.</p>
                            <h3>10. Contato</h3>
                            <p>Em caso de dúvidas sobre estes Termos, entre em contato: E-mail: suporte@doughlabpro.com. Endereço: {COMPANY_ADDRESS}</p>
                        </LegalSection>

                        <LegalSection id="politica-de-privacidade" title="Política de Privacidade" lastUpdated={LAST_UPDATED_DATE}>
                           <p>Esta Política explica como coletamos, tratamos, armazenamos e protegemos os dados pessoais dos Usuários, de acordo com a Lei Geral de Proteção de Dados (LGPD – Lei 13.709/2018).</p>
                           <h3>1. Dados que Coletamos</h3>
                           <p>Podemos coletar:</p>
                           <ul>
                            <li><strong>a) Dados fornecidos pelo Usuário:</strong> Nome; E-mail; Dados cadastrados voluntariamente; Conteúdos inseridos no MyLab (receitas, notas, fotos).</li>
                            <li><strong>b) Dados coletados automaticamente:</strong> Dados técnicos do dispositivo; Endereço IP, tipo de navegador e identificadores; Logs de uso; Cookies e tecnologias similares; Informações de desempenho do App.</li>
                            <li><strong>c) Dados de pagamento:</strong> Processados exclusivamente por terceiros (Google, Apple, processadores de pagamento). Não armazenamos informações completas de cartão de crédito.</li>
                           </ul>
                           <h3>2. Finalidades do Tratamento</h3>
                           <p>Utilizamos os dados para: permitir acesso e uso do App; personalizar e melhorar a experiência; registrar configurações pessoais e histórico do Usuário; realizar análises estatísticas e melhorias de produto; enviar comunicações relacionadas ao App; cumprir obrigações legais.</p>
                           <h3>3. Bases Legais (LGPD)</h3>
                           <p>Fundamentamos o tratamento em: consentimento; execução de contrato; legítimo interesse; cumprimento de obrigação legal ou regulatória.</p>
                           <h3>4. Compartilhamento de Dados</h3>
                           <p>Podemos compartilhar dados com: provedores de hospedagem e infraestrutura; serviços de analytics (como Google Analytics, Firebase); meios de pagamento e lojas de aplicativos. Não vendemos dados pessoais a terceiros.</p>
                           <h3>5. Transferência Internacional de Dados</h3>
                           <p>Dados podem ser processados fora do Brasil, em provedores de nuvem. Adotamos salvaguardas compatíveis com a LGPD.</p>
                           <h3>6. Retenção de Dados</h3>
                           <p>Manteremos os dados pessoais pelo tempo necessário ao cumprimento das finalidades descritas nesta Política, obrigações legais e exercício regular de direitos.</p>
                           <h3>7. Direitos do Titular</h3>
                           <p>O Usuário pode solicitar: confirmação de tratamento; acesso aos dados; correção; anonimização, bloqueio ou eliminação; portabilidade; revogação de consentimento. Para exercer esses direitos, utilize o contato abaixo.</p>
                           <h3>8. Segurança</h3>
                           <p>Adotamos medidas técnicas e administrativas razoáveis para proteger os dados, mas nenhum sistema é completamente invulnerável.</p>
                           <h3>9. Alterações desta Política</h3>
                           <p>Podemos atualizar esta Política periodicamente. O uso continuado do App após alterações implica concordância com a nova versão.</p>
                           <h3>10. Contato e Encarregado (DPO)</h3>
                           <p>E-mail: suporte@doughlabpro.com.br. Encarregado de Proteção de Dados: [NOME OU “A DEFINIR”]. Endereço: {COMPANY_ADDRESS}</p>
                        </LegalSection>

                        <LegalSection id="politica-de-cookies" title="Política de Cookies" lastUpdated={LAST_UPDATED_DATE}>
                          <h3>1. O que são Cookies</h3>
                          <p>Cookies são pequenos arquivos armazenados no seu dispositivo que ajudam a reconhecer o navegador e melhorar a experiência de uso, lembrando preferências e analisando desempenho.</p>
                          <h3>2. Como Usamos Cookies</h3>
                          <p>Podemos utilizar: Cookies estritamente necessários: para funcionamento básico do App; Cookies de desempenho: para entender uso e melhorar funcionalidades; Cookies de funcionalidade: para lembrar tema (claro/escuro), idioma e outras preferências; Cookies de publicidade (se aplicável): para medições de campanhas ou anúncios.</p>
                          <h3>3. Gerenciamento de Cookies</h3>
                          <p>Você pode gerenciar ou desativar cookies nas configurações do navegador ou dispositivo. Entretanto, isso pode afetar algumas funcionalidades do App.</p>
                          <h3>4. Cookies de Terceiros</h3>
                          <p>Serviços de terceiros, como analytics e meios de pagamento, também podem definir cookies próprios. Esses cookies são regidos pelas políticas dos respectivos terceiros.</p>
                          <h3>5. Alterações</h3>
                          <p>Podemos atualizar esta Política de Cookies periodicamente. A nova versão entra em vigor na data de publicação.</p>
                        </LegalSection>

                        <LegalSection id="eula" title="EULA – Licença de Usuário Final" lastUpdated={LAST_UPDATED_DATE}>
                          <h3>1. Licença</h3>
                          <p>Concedemos ao Usuário uma licença limitada, pessoal, não exclusiva, intransferível e revogável para instalar e utilizar o App em seus dispositivos, exclusivamente para fins pessoais.</p>
                          <h3>2. Restrições</h3>
                          <p>O Usuário se compromete a não: descompilar, realizar engenharia reversa ou tentar acessar o código-fonte; distribuir cópias não autorizadas do App; modificar, sublicenciar ou revender o App; utilizar o App para fins ilegais.</p>
                          <h3>3. Atualizações</h3>
                          <p>O App pode receber atualizações automáticas ou manuais. Ao continuar utilizando o App, o Usuário concorda com a instalação dessas atualizações.</p>
                          <h3>4. Propriedade Intelectual</h3>
                          <p>Todos os direitos de propriedade intelectual sobre o App, incluindo marcas, logotipos, design, textos, algoritmos e conteúdos, pertencem à {COMPANY_NAME} ou a seus licenciantes.</p>
                          <h3>5. Rescisão</h3>
                          <p>A Empresa pode suspender ou encerrar a licença se o Usuário violar este EULA ou os Termos de Uso. O Usuário poderá encerrar o uso do App a qualquer momento, desinstalando-o.</p>
                          <h3>6. Isenção de Garantias</h3>
                          <p>O App é fornecido “no estado em que se encontra”, sem garantias de qualquer tipo, sejam expressas ou implícitas, incluindo, sem limitação, garantias de adequação a uma finalidade específica.</p>
                          <h3>7. Limitação de Responsabilidade</h3>
                          <p>Na extensão máxima permitida por lei, a Empresa não será responsável por danos indiretos, incidentais, especiais, consequenciais, lucros cessantes ou perda de dados decorrentes do uso ou impossibilidade de uso do App.</p>
                        </LegalSection>

                        <LegalSection id="propriedade-intelectual" title="Propriedade Intelectual">
                            <p>Todo o conteúdo do DoughLabPro, incluindo, mas não se limitando a: nome e marca “DoughLabPro”; logotipos, ícones, elementos gráficos; layout, identidade visual e design de interface; textos, tutoriais, descrições e presets; algoritmos, modelos de cálculo e códigos-fonte; é de titularidade exclusiva de {COMPANY_NAME} ou de seus licenciantes, estando protegido pela legislação de direitos autorais, propriedade industrial e demais normas aplicáveis.</p>
                            <p>É expressamente proibido: copiar, reproduzir, distribuir ou modificar conteúdos do App sem autorização prévia e por escrito; utilizar marcas, logotipos ou elementos da identidade visual em produtos, serviços ou comunicações sem permissão.</p>
                            <p>Qualquer uso não autorizado poderá resultar em medidas civis, administrativas e criminais cabíveis.</p>
                        </LegalSection>

                        <LegalSection id="contato-legal" title="Contato Legal">
                            <p>Para dúvidas, solicitações sobre seus dados pessoais (LGPD) ou comunicações de natureza jurídica, utilize os canais abaixo:</p>
                            <p><strong>E-mail:</strong> suporte@doughlabpro.com</p>
                            <p><strong>Endereço:</strong> {COMPANY_ADDRESS}</p>
                            <p><strong>Encarregado de Proteção de Dados (DPO):</strong> [NOME, SE HOUVER]</p>
                            <p>Responderemos às solicitações em prazo razoável, observando a legislação aplicável.</p>
                        </LegalSection>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default LegalIndexPage;