document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA DO MENU RESPONSIVO (CORRIGIDA) ---
    const menuToggle = document.querySelector('.menu');
    const navMenu = document.querySelector('.nav-menu');

    // Função de TOGGLE
    menuToggle.addEventListener('click', () => {
        // Usa a classe 'ativo' no menuToggle para o CSS de animação/transformação
        menuToggle.classList.toggle('ativo');
        // Usa a classe 'active' no navMenu para mostrar/esconder o menu
        navMenu.classList.toggle('active'); 
        
        // Troca o texto do botão entre Hambúrguer (☰) e X (✕)
        if (navMenu.classList.contains('active')) {
             menuToggle.textContent = '✕'; 
        } else {
             menuToggle.textContent = '☰';
        }
    });

    // Fechar o menu ao clicar em um link (para mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 785) {
                if(navMenu.classList.contains('active')) {
                   menuToggle.classList.remove('ativo');
                   navMenu.classList.remove('active');
                   menuToggle.textContent = '☰'; // Volta para o hambúrguer
                }
            }
        });
    });

    // --- LÓGICA DO CARROSSEL DE PROJETOS (RESTAURADA E COMPLETA) ---

    // 1. Dados dos Projetos (MOCK DATA)
    const PROJECTS_DATA = {
        "Power BI": [
            { id: 1, title: "Dashboard de Vendsavdsdas SaaS", subtitle: "KPIs e Previsão dvsvdse Churn", description: "Criação devsdvsd um painel de controle interativo para rastrear métricas de SaaS, como MRR, ARR e análise preditiva de clientes. Ferramenta essencial para tomada de decisão estratégica.", link: "https://app.powerbi.com/view?r=eyJrIjoiMDA0Y2VmN2QtZjNiYi00MjEwLWFjYzItY2YwMzg2MzllNmYwIiwidCI6ImY5NTUwY2NjLWNiZmQtNGUxNy1iNWJmLTE3ODAxNmUwOGVhZCJ9", image: "img/RelFuncP.png" },
            { id: 2, title: "Relatório de Gestão de Frota", subtitle: "Otimização de Custos", description: "Implementação de um relatório dinâmico que cruza dados de telemetria e custos operacionais, identificando rotas ineficientes e potencial de economia de combustível.", link: "https://exemplo.com/powerbi/frota", image: "relatorio-frota.jpg" },
            { id: 3, title: "Análise Financeira Completa", subtitle: "DRE, Balanço e Fluxo de Caixa", description: "Conjunto de visuais para monitoramento da saúde financeira da empresa, permitindo drill-down em despesas e receitas por centro de custo.", link: "https://exemplo.com/powerbi/financeiro", image: "analise-financeira.jpg" },
        ],
        "Python": [
            { id: 4, title: "Web Scraping para Leads B2B", subtitle: "Automação de Captura de Dados", description: "Desenvolvimento de um script robusto em Python (usando BeautifulSoup e Selenium) para extração automatizada de perfis de empresas de nicho em grandes diretórios web.", link: "https://github.com/lancerlytics/python-scraper", image: "python-scraper.jpg" },
            { id: 5, title: "Análise de Sentimento com NLP", subtitle: "Processamento de Linguagem Natural", description: "Modelo treinado em Python (com NLTK e Scikit-learn) para classificar o feedback de clientes em positivo, negativo ou neutro, gerando insights sobre a satisfação.", link: "https://github.com/lancerlytics/nlp-sentiment", image: "python-nlp.jpg" },
        ],
        "Excel": [
            { id: 6, title: "Controle de Estoque Avançado", subtitle: "VBA e Otimização de Inventário", description: "Planilha com macros em VBA para automação de entradas e saídas, cálculo automático do Ponto de Pedido e alertas visuais de estoque mínimo.", link: "https://exemplo.com/excel/estoque", image: "excel-estoque.jpg" },
            { id: 7, title: "Ferramenta de Orçamento Dinâmico", subtitle: "Simulação de Cenários (What-if)", description: "Desenvolvimento de uma ferramenta em Excel que permite a simulação de diferentes cenários orçamentários com base em variáveis de mercado.", link: "https://exemplo.com/excel/orcamento", image: "excel-orcamento.jpg" },
        ],
        "Banco de Dados": [
            { id: 8, title: "Modelagem de Data Warehouse (SQL)", subtitle: "Esquema Estrela e Otimização", description: "Projeto completo de um Data Warehouse, incluindo a modelagem do esquema estrela, a criação de ETLs e a otimização de consultas em SQL para desempenho máximo.", link: "https://github.com/lancerlytics/sql-datawarehouse", image: "sql-data-warehouse.jpg" },
        ]
    };

    // 2. Elementos DOM do Carrossel
    const categoryDisplay = document.getElementById('current-category');
    const prevCategoryBtn = document.getElementById('prev-category-btn');
    const nextCategoryBtn = document.getElementById('next-category-btn');
    const projectsContainer = document.getElementById('projects-container');
    const projectDetailsSection = document.getElementById('project-details');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailLink = document.getElementById('detail-link');
    const detailImage = document.getElementById('detail-image');
    
    // 3. Controle do Carrossel de Categorias
    const categories = Object.keys(PROJECTS_DATA);
    let currentCategoryIndex = 0;

    function renderCategoryProjects(category) {
        projectsContainer.innerHTML = '';
        projectDetailsSection.style.display = 'none';

        const projects = PROJECTS_DATA[category];
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('sample-item');
            projectElement.dataset.projectId = project.id;
            
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h2>${project.title}</h2>
                <p>${project.subtitle}</p>
            `;
            
            projectElement.addEventListener('click', () => displayProjectDetails(project));
            projectsContainer.appendChild(projectElement);
        });
    }

    function updateCategory() {
        const category = categories[currentCategoryIndex];
        categoryDisplay.textContent = category;
        renderCategoryProjects(category);
    }

    prevCategoryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
        updateCategory();
    });

    nextCategoryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        updateCategory();
    });

    function displayProjectDetails(project) {
        detailTitle.textContent = project.title;
        detailDescription.textContent = project.description;
        detailLink.href = project.link;
        detailImage.src = project.image;
        detailImage.alt = project.title;

        projectDetailsSection.style.display = 'flex';
        projectDetailsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Inicializa a página
    updateCategory();
});
