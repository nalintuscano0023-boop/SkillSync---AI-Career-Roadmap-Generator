
const state = {
  data: null,
  currentCareer: null,
  currentLevel: null,
  completedSteps: new Set(),
  completedSkills: new Set(),
  xp: 0,
  streak: 3,
  earnedBadges: new Set(),
  activityLog: [],
  profileName: 'Alex Johnson',
  profileColor: '#6366f1',
  chart: null,
  currentGraphCareer: 'frontend'
};

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initGreeting();
  initParticles();
  renderBadges();
  renderCareersPreview();
  initNavigation();
  initSidebar();
  initChat();
  initCompare();
  initSkillGraph();
  initProfileModal();
  initChatFloat();
  updateGamification();
  updateHeaderStats();
  setInterval(updateHeaderStats, 30000);
  document.getElementById('insightCtaBtn').addEventListener('click', () => navigateTo('generate'));
  document.getElementById('chatInitTime').textContent = formatTime(new Date());
  document.getElementById('chatToggleBtn').addEventListener('click', () => document.getElementById('chatFloatPanel').classList.toggle('open'));
  document.getElementById('resetRoadmapBtn').addEventListener('click', resetRoadmap);
  document.getElementById('compareBtn').addEventListener('click', runCompare);
  document.querySelectorAll('.sg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentGraphCareer = btn.dataset.career;
      renderSkillGraph(state.currentGraphCareer);
    });
  });
});

async function loadData() {
  

  state.data = getEmbeddedData();
}

function getEmbeddedData() {
return {
    "careers": {
      "frontend": {
        "title": "Frontend Developer","icon": "🌐","color": "#6366f1","difficulty": "Intermediate","avgSalary": "$85,000","timeToJob": "6-9 months","demandLevel": "Very High",
        "levels": {
          "beginner": { "label": "Beginner","description": "Just starting your frontend journey","totalSkills": 12,
            "roadmap": [
              { "id": "fe-b-1","step": 1,"title": "HTML Fundamentals","description": "Learn HTML5 structure, semantic elements, forms, tables, and multimedia elements.","duration": "1-2 weeks","resources": ["MDN Web Docs","freeCodeCamp","W3Schools"],"skills": ["HTML5","Semantic HTML","Forms","Accessibility"],"category": "Core" },
              { "id": "fe-b-2","step": 2,"title": "CSS Basics","description": "Master CSS selectors, box model, flexbox, grid, and responsive design principles.","duration": "2-3 weeks","resources": ["CSS-Tricks","Flexbox Froggy","Grid Garden"],"skills": ["CSS3","Flexbox","Grid","Responsive Design"],"category": "Core" },
              { "id": "fe-b-3","step": 3,"title": "JavaScript Essentials","description": "Understand variables, functions, DOM manipulation, events, and ES6+ features.","duration": "3-4 weeks","resources": ["JavaScript.info","Eloquent JavaScript","MDN"],"skills": ["JavaScript","DOM","ES6+","Events"],"category": "Core" },
              { "id": "fe-b-4","step": 4,"title": "Version Control with Git","description": "Learn Git basics, branching, merging, pull requests, and GitHub workflow.","duration": "1 week","resources": ["Git Documentation","GitHub Learning Lab","Atlassian Git"],"skills": ["Git","GitHub","Version Control"],"category": "Tools" },
              { "id": "fe-b-5","step": 5,"title": "Responsive Web Design","description": "Build mobile-first layouts using media queries, viewport units, and fluid typography.","duration": "1-2 weeks","resources": ["Responsive Web Design","Bootstrap Docs"],"skills": ["Media Queries","Mobile-First","CSS Variables"],"category": "Design" },
              { "id": "fe-b-6","step": 6,"title": "Build First Projects","description": "Create landing pages, portfolio site, and simple interactive apps.","duration": "2-3 weeks","resources": ["Frontend Mentor","CSS Battle","100 Days CSS"],"skills": ["Project Building","Debugging","Deployment"],"category": "Practice" }
            ],
            "requiredSkills": ["HTML5","CSS3","JavaScript","Git","Responsive Design","Flexbox","Grid","DOM","ES6+","Debugging","Semantic HTML","Deployment"]
          },
          "intermediate": { "label": "Intermediate","description": "Growing your frontend expertise","totalSkills": 16,
            "roadmap": [
              { "id": "fe-i-1","step": 1,"title": "React.js Fundamentals","description": "Master React components, props, state, hooks, and the virtual DOM concept.","duration": "3-4 weeks","resources": ["React Docs","Scrimba React","Kent C. Dodds Blog"],"skills": ["React","Hooks","Components","JSX"],"category": "Framework" },
              { "id": "fe-i-2","step": 2,"title": "State Management","description": "Learn Context API, Redux Toolkit, and Zustand for managing app-wide state.","duration": "2-3 weeks","resources": ["Redux Toolkit Docs","Zustand GitHub","React Context"],"skills": ["Redux","Context API","State Management"],"category": "Framework" },
              { "id": "fe-i-3","step": 3,"title": "APIs & Async JavaScript","description": "Master fetch API, Axios, async/await, Promises, and REST API integration.","duration": "2 weeks","resources": ["MDN Fetch API","Axios Docs","REST API Tutorial"],"skills": ["REST APIs","Fetch","Axios","Async/Await"],"category": "Core" },
              { "id": "fe-i-4","step": 4,"title": "CSS Frameworks & Preprocessors","description": "Learn Tailwind CSS, SASS/SCSS, and CSS-in-JS solutions.","duration": "2 weeks","resources": ["Tailwind Docs","SASS Guide","Styled Components"],"skills": ["Tailwind CSS","SASS","CSS Modules"],"category": "Styling" },
              { "id": "fe-i-5","step": 5,"title": "Testing Fundamentals","description": "Write unit tests with Jest and component tests with React Testing Library.","duration": "2 weeks","resources": ["Jest Docs","Testing Library","Vitest"],"skills": ["Jest","Testing Library","Unit Testing"],"category": "Quality" },
              { "id": "fe-i-6","step": 6,"title": "Performance Optimization","description": "Learn lazy loading, code splitting, memoization, and Core Web Vitals.","duration": "1-2 weeks","resources": ["Web.dev","Lighthouse","Chrome DevTools"],"skills": ["Performance","Lazy Loading","Memoization"],"category": "Advanced" },
              { "id": "fe-i-7","step": 7,"title": "Build Full Projects","description": "Create a full-featured SPA with authentication, API integration, and deployment.","duration": "3-4 weeks","resources": ["Frontend Mentor","Netlify","Vercel"],"skills": ["Full Project","Deployment","CI/CD"],"category": "Practice" }
            ],
            "requiredSkills": ["React","Redux","REST APIs","Tailwind CSS","SASS","TypeScript","Jest","Performance","Webpack","Lazy Loading","Context API","Hooks","Async/Await","Git","Deployment","Testing"]
          },
          "advanced": { "label": "Advanced","description": "Becoming a senior frontend engineer","totalSkills": 20,
            "roadmap": [
              { "id": "fe-a-1","step": 1,"title": "TypeScript Mastery","description": "Deep dive into TypeScript, generics, decorators, and advanced types.","duration": "2-3 weeks","resources": ["TypeScript Docs","Total TypeScript","Matt Pocock"],"skills": ["TypeScript","Generics","Type Safety"],"category": "Language" },
              { "id": "fe-a-2","step": 2,"title": "Next.js & SSR/SSG","description": "Master Next.js App Router, server components, SSR, SSG, ISR.","duration": "3-4 weeks","resources": ["Next.js Docs","Lee Robinson Blog","Vercel Learn"],"skills": ["Next.js","SSR","SSG","App Router"],"category": "Framework" },
              { "id": "fe-a-3","step": 3,"title": "System Design for Frontend","description": "Learn micro-frontends, design systems, monorepos, and scalable architecture.","duration": "2-3 weeks","resources": ["Frontend System Design","Turborepo","Module Federation"],"skills": ["Micro-Frontend","Design Systems","Architecture"],"category": "Architecture" },
              { "id": "fe-a-4","step": 4,"title": "Advanced Performance","description": "Master Core Web Vitals, streaming, PWA, service workers, and caching strategies.","duration": "2 weeks","resources": ["web.dev","PWA Documentation","Workbox"],"skills": ["PWA","Service Workers","Core Web Vitals"],"category": "Performance" },
              { "id": "fe-a-5","step": 5,"title": "DevOps & CI/CD","description": "Set up GitHub Actions, Docker basics, Vercel/Netlify deployments, and monitoring.","duration": "2 weeks","resources": ["GitHub Actions Docs","Docker Beginner","Vercel Docs"],"skills": ["CI/CD","Docker","GitHub Actions"],"category": "DevOps" },
              { "id": "fe-a-6","step": 6,"title": "Open Source & Leadership","description": "Contribute to open source, mentor others, and lead technical decisions.","duration": "Ongoing","resources": ["Good First Issues","GitHub Explore","Open Source Guide"],"skills": ["Open Source","Leadership","Code Review"],"category": "Leadership" }
            ],
            "requiredSkills": ["TypeScript","Next.js","SSR","SSG","Micro-Frontend","Design Systems","PWA","CI/CD","GraphQL","Docker","Testing","Performance","Architecture","Leadership","Open Source","Monorepo","Webpack","Core Web Vitals","Service Workers","Code Review"]
          }
        }
      },
      "backend": {
        "title": "Backend Developer","icon": "⚙️","color": "#10b981","difficulty": "Intermediate-Hard","avgSalary": "$95,000","timeToJob": "8-12 months","demandLevel": "High",
        "levels": {
          "beginner": { "label": "Beginner","description": "Starting your backend development journey","totalSkills": 12,
            "roadmap": [
              { "id": "be-b-1","step": 1,"title": "Programming Fundamentals","description": "Master Python or JavaScript basics: data structures, algorithms, OOP.","duration": "3-4 weeks","resources": ["Python.org","CS50","Automate The Boring Stuff"],"skills": ["Python","Algorithms","OOP","Data Structures"],"category": "Core" },
              { "id": "be-b-2","step": 2,"title": "Web Basics & HTTP","description": "Understand HTTP methods, status codes, headers, and REST principles.","duration": "1 week","resources": ["MDN HTTP","REST Tutorial","HTTP Made Simple"],"skills": ["HTTP","REST","APIs","Headers"],"category": "Core" },
              { "id": "be-b-3","step": 3,"title": "Node.js & Express","description": "Build servers with Node.js, create REST APIs with Express.","duration": "3-4 weeks","resources": ["Node.js Docs","Express.js Docs","The Odin Project"],"skills": ["Node.js","Express","REST API"],"category": "Framework" },
              { "id": "be-b-4","step": 4,"title": "Databases (SQL)","description": "Learn SQL fundamentals, MySQL/PostgreSQL, CRUD operations, joins, indexing.","duration": "2-3 weeks","resources": ["PostgreSQL Docs","SQLZoo","Mode Analytics"],"skills": ["SQL","PostgreSQL","CRUD","Joins"],"category": "Database" },
              { "id": "be-b-5","step": 5,"title": "Authentication & Security","description": "Implement JWT, OAuth, bcrypt, CORS, and security best practices.","duration": "2 weeks","resources": ["JWT.io","Passport.js Docs","OWASP"],"skills": ["JWT","OAuth","Security","Bcrypt"],"category": "Security" },
              { "id": "be-b-6","step": 6,"title": "Deploy Your First API","description": "Deploy Node.js APIs to Railway, Render, or Heroku.","duration": "1 week","resources": ["Railway Docs","Render Docs","Heroku Docs"],"skills": ["Deployment","Environment Variables","Cloud"],"category": "DevOps" }
            ],
            "requiredSkills": ["Python","Node.js","Express","SQL","PostgreSQL","REST API","JWT","HTTP","Git","Deployment","Authentication","Security"]
          },
          "intermediate": { "label": "Intermediate","description": "Building production-grade backends","totalSkills": 16,
            "roadmap": [
              { "id": "be-i-1","step": 1,"title": "Advanced Node.js","description": "Event loop, streams, clustering, worker threads, and high-performance patterns.","duration": "2-3 weeks","resources": ["NodeJS Design Patterns","Node.js Best Practices","Streams"],"skills": ["Event Loop","Streams","Clustering"],"category": "Advanced" },
              { "id": "be-i-2","step": 2,"title": "NoSQL Databases","description": "MongoDB, Redis for caching, and database design patterns.","duration": "2 weeks","resources": ["MongoDB University","Redis Docs","Mongoose"],"skills": ["MongoDB","Redis","NoSQL","Mongoose"],"category": "Database" },
              { "id": "be-i-3","step": 3,"title": "GraphQL APIs","description": "Design and build GraphQL schemas, resolvers, mutations, and Apollo Server.","duration": "2-3 weeks","resources": ["GraphQL Docs","Apollo Server","How to GraphQL"],"skills": ["GraphQL","Apollo","Schema Design"],"category": "API" },
              { "id": "be-i-4","step": 4,"title": "Microservices Architecture","description": "Distributed systems, message queues, Docker, and API gateways.","duration": "3-4 weeks","resources": ["Microservices.io","RabbitMQ Docs","Docker Docs"],"skills": ["Microservices","Docker","Message Queues"],"category": "Architecture" },
              { "id": "be-i-5","step": 5,"title": "Testing & Documentation","description": "Unit testing with Jest, integration testing, API docs with Swagger/OpenAPI.","duration": "2 weeks","resources": ["Jest Docs","Swagger UI","Postman"],"skills": ["Jest","Swagger","API Testing"],"category": "Quality" }
            ],
            "requiredSkills": ["Node.js","MongoDB","Redis","GraphQL","Docker","Microservices","AWS","CI/CD","Jest","Swagger","Streams","Message Queues","Kubernetes","PostgreSQL","Authentication","API Design"]
          },
          "advanced": { "label": "Advanced","description": "Mastering backend architecture at scale","totalSkills": 20,
            "roadmap": [
              { "id": "be-a-1","step": 1,"title": "System Design","description": "Design scalable systems, load balancing, CAP theorem, sharding.","duration": "4-6 weeks","resources": ["System Design Primer","Designing Data-Intensive Applications","ByteByteGo"],"skills": ["System Design","Load Balancing","Sharding"],"category": "Architecture" },
              { "id": "be-a-2","step": 2,"title": "Cloud Architecture","description": "Design cloud-native applications on AWS/GCP/Azure.","duration": "3-4 weeks","resources": ["AWS Solutions Architect","GCP Professional","Azure Fundamentals"],"skills": ["AWS","GCP","Serverless","Cloud Native"],"category": "Cloud" }
            ],
            "requiredSkills": ["System Design","Load Balancing","Sharding","Security Audits","Prometheus","Grafana","AWS","GCP","Serverless","Query Optimization","Caching","Kubernetes","Event-Driven","CQRS","Domain-Driven Design","Terraform","Observability","Distributed Systems","CAP Theorem","Performance Engineering"]
          }
        }
      },
      "datascience": {
        "title": "Data Scientist","icon": "📊","color": "#f59e0b","difficulty": "Hard","avgSalary": "$110,000","timeToJob": "10-14 months","demandLevel": "Very High",
        "levels": {
          "beginner": { "label": "Beginner","description": "Entering the data science world","totalSkills": 12,
            "roadmap": [
              { "id": "ds-b-1","step": 1,"title": "Python for Data Science","description": "Python basics, NumPy, Pandas for data manipulation, and Jupyter notebooks.","duration": "3-4 weeks","resources": ["Python Data Science Handbook","Kaggle Learn","Fast.ai"],"skills": ["Python","NumPy","Pandas","Jupyter"],"category": "Core" },
              { "id": "ds-b-2","step": 2,"title": "Statistics & Probability","description": "Descriptive statistics, probability distributions, hypothesis testing.","duration": "3-4 weeks","resources": ["StatQuest","Think Stats","Khan Academy Stats"],"skills": ["Statistics","Probability","Hypothesis Testing"],"category": "Math" },
              { "id": "ds-b-3","step": 3,"title": "Data Visualization","description": "Create compelling charts with Matplotlib, Seaborn, and Plotly.","duration": "2 weeks","resources": ["Matplotlib Docs","Seaborn Tutorial","Plotly Express"],"skills": ["Matplotlib","Seaborn","Visualization"],"category": "Visualization" },
              { "id": "ds-b-4","step": 4,"title": "SQL for Data Analysis","description": "Write complex SQL queries, window functions, CTEs, and analyze datasets.","duration": "2-3 weeks","resources": ["Mode SQL Tutorial","SQLZoo","LeetCode SQL"],"skills": ["SQL","Data Analysis","Window Functions"],"category": "Database" },
              { "id": "ds-b-5","step": 5,"title": "Machine Learning Basics","description": "Supervised learning, linear/logistic regression, decision trees with Scikit-learn.","duration": "4-5 weeks","resources": ["Scikit-learn Docs","StatQuest ML","Hands-On ML Book"],"skills": ["Scikit-learn","Regression","Classification"],"category": "ML" },
              { "id": "ds-b-6","step": 6,"title": "First EDA Projects","description": "Complete Exploratory Data Analysis on Kaggle datasets.","duration": "2-3 weeks","resources": ["Kaggle Datasets","MadeWithML","Towards Data Science"],"skills": ["EDA","Data Cleaning","Storytelling"],"category": "Practice" }
            ],
            "requiredSkills": ["Python","NumPy","Pandas","Statistics","SQL","Matplotlib","Seaborn","Scikit-learn","Regression","EDA","Jupyter","Data Cleaning"]
          },
          "intermediate": { "label": "Intermediate","description": "Building real ML solutions","totalSkills": 16,
            "roadmap": [
              { "id": "ds-i-1","step": 1,"title": "Advanced Machine Learning","description": "Ensemble methods, SVM, clustering, feature engineering, and model selection.","duration": "4-5 weeks","resources": ["Scikit-learn Advanced","Feature Engineering Book","Kaggle"],"skills": ["Random Forest","SVM","Clustering","Feature Engineering"],"category": "ML" },
              { "id": "ds-i-2","step": 2,"title": "Deep Learning Foundations","description": "Neural networks, CNNs, RNNs with TensorFlow/Keras or PyTorch.","duration": "4-6 weeks","resources": ["Deep Learning Specialization","fast.ai","PyTorch Docs"],"skills": ["Neural Networks","CNN","RNN","PyTorch"],"category": "DL" },
              { "id": "ds-i-3","step": 3,"title": "Natural Language Processing","description": "Text processing, sentiment analysis, transformers, Hugging Face.","duration": "3-4 weeks","resources": ["Hugging Face Course","NLP with Transformers","NLTK"],"skills": ["NLP","Transformers","BERT","Sentiment Analysis"],"category": "NLP" }
            ],
            "requiredSkills": ["Random Forest","SVM","Neural Networks","PyTorch","NLP","BERT","MLflow","FastAPI","Spark","BigQuery","Feature Engineering","Cross-Validation","Model Deployment","Airflow","A/B Testing","Statistics"]
          },
          "advanced": { "label": "Advanced","description": "Cutting-edge AI research and production ML","totalSkills": 20,
            "roadmap": [
              { "id": "ds-a-1","step": 1,"title": "Generative AI & LLMs","description": "Fine-tuning LLMs, prompt engineering, RAG systems, LangChain.","duration": "4-6 weeks","resources": ["LangChain Docs","OpenAI Cookbook","Hugging Face PEFT"],"skills": ["LLMs","RAG","Fine-tuning","LangChain"],"category": "GenAI" }
            ],
            "requiredSkills": ["LLMs","RAG","Fine-tuning","LangChain","Reinforcement Learning","Computer Vision","GANs","Research","ML System Design","Feature Store","Real-time ML","Distributed Training","CUDA","Triton","Experiment Tracking","Data Governance","Ethics in AI","Causal Inference","Time Series","Anomaly Detection"]
          }
        }
      },
      "devops": {
        "title": "DevOps Engineer","icon": "🔧","color": "#ef4444","difficulty": "Hard","avgSalary": "$105,000","timeToJob": "10-14 months","demandLevel": "High",
        "levels": {
          "beginner": { "label": "Beginner","description": "Starting your DevOps journey","totalSkills": 12,
            "roadmap": [
              { "id": "dv-b-1","step": 1,"title": "Linux & Shell Scripting","description": "Master Linux commands, bash scripting, file permissions, and cron jobs.","duration": "3-4 weeks","resources": ["Linux Journey","The Linux Command Line","Over the Wire"],"skills": ["Linux","Bash","Shell Scripting","Cron"],"category": "OS" },
              { "id": "dv-b-2","step": 2,"title": "Networking Fundamentals","description": "TCP/IP, DNS, HTTP/HTTPS, load balancing, firewalls, and SSL/TLS.","duration": "2-3 weeks","resources": ["Computer Networking","Professor Messer","Cloudflare Learning"],"skills": ["TCP/IP","DNS","HTTP","Networking"],"category": "Infrastructure" },
              { "id": "dv-b-3","step": 3,"title": "Docker & Containers","description": "Build Docker images, Dockerfiles, Docker Compose, and container networking.","duration": "2-3 weeks","resources": ["Docker Docs","Docker for Beginners","Play with Docker"],"skills": ["Docker","Containers","Docker Compose"],"category": "Containers" },
              { "id": "dv-b-4","step": 4,"title": "CI/CD Pipelines","description": "Build automated pipelines with GitHub Actions and Jenkins.","duration": "2-3 weeks","resources": ["GitHub Actions Docs","Jenkins Tutorial","GitLab CI"],"skills": ["GitHub Actions","CI/CD","Jenkins"],"category": "Automation" },
              { "id": "dv-b-5","step": 5,"title": "Cloud Basics (AWS)","description": "AWS fundamentals: EC2, S3, VPC, IAM, RDS, and basic infrastructure.","duration": "3-4 weeks","resources": ["AWS Free Tier","AWS Cloud Practitioner","A Cloud Guru"],"skills": ["AWS","EC2","S3","IAM","VPC"],"category": "Cloud" }
            ],
            "requiredSkills": ["Linux","Bash","Docker","Git","CI/CD","AWS","Networking","TCP/IP","Containers","GitHub Actions","VPC","IAM"]
          },
          "intermediate": { "label": "Intermediate","description": "Building production infrastructure","totalSkills": 16,
            "roadmap": [
              { "id": "dv-i-1","step": 1,"title": "Kubernetes","description": "Kubernetes architecture, pods, deployments, services, Helm charts.","duration": "4-6 weeks","resources": ["Kubernetes Docs","KodeKloud","CKAD Prep"],"skills": ["Kubernetes","Helm","Pods","Services"],"category": "Orchestration" },
              { "id": "dv-i-2","step": 2,"title": "Infrastructure as Code","description": "Terraform, Ansible, and Pulumi for provisioning cloud infrastructure.","duration": "3-4 weeks","resources": ["Terraform Docs","Ansible Docs","HashiCorp Learn"],"skills": ["Terraform","Ansible","IaC"],"category": "IaC" },
              { "id": "dv-i-3","step": 3,"title": "Monitoring & Observability","description": "Set up Prometheus, Grafana, ELK stack, and distributed tracing.","duration": "2-3 weeks","resources": ["Prometheus Docs","Grafana Docs","OpenTelemetry"],"skills": ["Prometheus","Grafana","ELK","Observability"],"category": "Monitoring" }
            ],
            "requiredSkills": ["Kubernetes","Terraform","Ansible","Prometheus","Grafana","ELK","Vault","Istio","Helm","AWS Advanced","GitOps","ArgoCD","Security Scanning","Chaos Engineering","Cost Optimization","SRE Practices"]
          },
          "advanced": { "label": "Advanced","description": "Leading platform engineering teams","totalSkills": 20,
            "roadmap": [
              { "id": "dv-a-1","step": 1,"title": "Platform Engineering","description": "Build Internal Developer Platforms, golden paths, and developer experience tooling.","duration": "4-6 weeks","resources": ["Platform Engineering","Backstage.io","Humanitec"],"skills": ["Platform Engineering","IDP","Backstage"],"category": "Platform" }
            ],
            "requiredSkills": ["Platform Engineering","SRE","Chaos Engineering","FinOps","Multi-Cloud","Service Mesh Advanced","GitOps","Supply Chain Security","eBPF","Custom Operators","Cluster API","OPA","Policy as Code","SBOM","Zero Trust","Compliance Automation","Cost Engineering","Reliability Engineering","Observability Platform","Developer Experience"]
          }
        }
      },
      "fullstack": {
        "title": "Full Stack Developer","icon": "🚀","color": "#8b5cf6","difficulty": "Hard","avgSalary": "$100,000","timeToJob": "10-14 months","demandLevel": "Very High",
        "levels": {
          "beginner": { "label": "Beginner","description": "Learning full-stack basics","totalSkills": 14,
            "roadmap": [
              { "id": "fs-b-1","step": 1,"title": "HTML, CSS & JavaScript","description": "Complete frontend fundamentals with HTML5, CSS3, and vanilla JavaScript.","duration": "4-6 weeks","resources": ["The Odin Project","freeCodeCamp","MDN"],"skills": ["HTML5","CSS3","JavaScript","DOM"],"category": "Frontend" },
              { "id": "fs-b-2","step": 2,"title": "Node.js & Express APIs","description": "Build backend servers with Node.js and create RESTful APIs.","duration": "3-4 weeks","resources": ["Node.js Docs","Express Docs","The Odin Project"],"skills": ["Node.js","Express","REST API"],"category": "Backend" },
              { "id": "fs-b-3","step": 3,"title": "Databases (SQL + NoSQL)","description": "Learn PostgreSQL for relational data and MongoDB for documents.","duration": "3-4 weeks","resources": ["PostgreSQL Tutorial","MongoDB University","Mongoose"],"skills": ["PostgreSQL","MongoDB","SQL","NoSQL"],"category": "Database" },
              { "id": "fs-b-4","step": 4,"title": "React Front-end","description": "Build dynamic UIs with React, hooks, and connect to your Express backend.","duration": "3-4 weeks","resources": ["React Docs","Scrimba","Full Stack Open"],"skills": ["React","Hooks","Fetch API"],"category": "Frontend" },
              { "id": "fs-b-5","step": 5,"title": "Authentication & Deployment","description": "Implement JWT auth and deploy full-stack apps to cloud platforms.","duration": "2-3 weeks","resources": ["JWT.io","Railway Docs","Render.com"],"skills": ["JWT","Authentication","Deployment"],"category": "Security" },
              { "id": "fs-b-6","step": 6,"title": "Build CRUD Applications","description": "Create complete CRUD apps with user auth, database, and responsive UI.","duration": "3-4 weeks","resources": ["Full Stack Open","Frontend Mentor","Vercel"],"skills": ["CRUD","Full Stack","Project Building"],"category": "Practice" }
            ],
            "requiredSkills": ["HTML5","CSS3","JavaScript","React","Node.js","Express","PostgreSQL","MongoDB","JWT","REST API","Git","Deployment","SQL","Authentication"]
          },
          "intermediate": { "label": "Intermediate","description": "Building scalable full-stack applications","totalSkills": 18,
            "roadmap": [
              { "id": "fs-i-1","step": 1,"title": "Next.js Full-Stack","description": "Next.js App Router, API routes, server/client components.","duration": "3-4 weeks","resources": ["Next.js Docs","Vercel Learn","Lee Robinson"],"skills": ["Next.js","App Router","Server Components"],"category": "Framework" },
              { "id": "fs-i-2","step": 2,"title": "TypeScript","description": "Add type safety across entire stack with TypeScript.","duration": "2-3 weeks","resources": ["TypeScript Docs","Total TypeScript","Matt Pocock"],"skills": ["TypeScript","Type Safety","Generics"],"category": "Language" },
              { "id": "fs-i-3","step": 3,"title": "Advanced State & Data Fetching","description": "TanStack Query, Zustand, SWR, and optimistic updates.","duration": "2 weeks","resources": ["TanStack Query Docs","Zustand","SWR Docs"],"skills": ["TanStack Query","Zustand","SWR"],"category": "State" },
              { "id": "fs-i-4","step": 4,"title": "Testing Full Stack","description": "End-to-end testing with Playwright/Cypress and unit tests.","duration": "2-3 weeks","resources": ["Playwright Docs","Cypress Docs","Vitest"],"skills": ["Playwright","Cypress","E2E Testing"],"category": "Quality" }
            ],
            "requiredSkills": ["Next.js","TypeScript","TanStack Query","Zustand","Playwright","Redis","GraphQL","Docker","CI/CD","Performance","App Router","Server Actions","Prisma","Authentication","tRPC","Testing","Core Web Vitals","Database Design"]
          },
          "advanced": { "label": "Advanced","description": "Architecting large-scale full-stack systems","totalSkills": 20,
            "roadmap": [
              { "id": "fs-a-1","step": 1,"title": "Scalable Architecture","description": "Monorepo, micro-frontends, BFF pattern, and design systems.","duration": "4 weeks","resources": ["Turborepo","Module Federation","Storybook"],"skills": ["Monorepo","Micro-Frontend","Design System"],"category": "Architecture" }
            ],
            "requiredSkills": ["Monorepo","Micro-Frontend","WebSockets","Kafka","CQRS","Event Sourcing","Multi-tenancy","Observability","Security Hardening","Cost Optimization","Global Deployment","Edge Computing","CDN Strategy","Database Sharding","API Gateway","Rate Limiting","Feature Flags","A/B Testing","Documentation","Tech Leadership"]
          }
        }
      }
    },
    "projects": {
      "frontend": {
        "beginner": [
          { "id": "p1","title": "Personal Portfolio Website","description": "Build a stunning portfolio with HTML, CSS animations, and JS interactions. Include hero section, projects grid, and contact form.","difficulty": "Easy","duration": "1 week","skills": ["HTML5","CSS3","JavaScript"],"githubIdea": "portfolio-v1" },
          { "id": "p2","title": "Weather App","description": "Fetch real weather data from OpenWeatherMap API. Show current weather and 5-day forecast with animated icons.","difficulty": "Easy-Medium","duration": "3-5 days","skills": ["JavaScript","APIs","CSS3"],"githubIdea": "weather-app" },
          { "id": "p3","title": "To-Do List App","description": "Full-featured task manager with local storage, categories, priority levels, and drag-and-drop reordering.","difficulty": "Easy","duration": "3-4 days","skills": ["JavaScript","DOM","Local Storage"],"githubIdea": "todo-app" }
        ],
        "intermediate": [
          { "id": "p4","title": "E-commerce Product Page","description": "React-based product page with cart, filtering, search, infinite scroll, and Stripe-like checkout flow.","difficulty": "Medium","duration": "2 weeks","skills": ["React","Redux","REST API"],"githubIdea": "ecommerce-react" },
          { "id": "p5","title": "Real-time Chat UI","description": "Messenger-like chat interface with React, WebSocket connection, emoji picker, and typing indicators.","difficulty": "Medium","duration": "1-2 weeks","skills": ["React","WebSockets","Hooks"],"githubIdea": "chat-ui-react" },
          { "id": "p6","title": "Dashboard Analytics App","description": "Admin dashboard with Chart.js visualizations, data tables, dark mode, and responsive layout.","difficulty": "Medium-Hard","duration": "2-3 weeks","skills": ["React","Chart.js","REST API"],"githubIdea": "analytics-dashboard" }
        ],
        "advanced": [
          { "id": "p7","title": "Design System & Component Library","description": "Build a complete design system with Storybook, accessibility, TypeScript, and npm publishing.","difficulty": "Hard","duration": "3-4 weeks","skills": ["React","TypeScript","Storybook"],"githubIdea": "design-system" },
          { "id": "p8","title": "Next.js SaaS Starter","description": "Full-featured SaaS boilerplate with auth, subscriptions, admin panel, multi-tenancy, and Stripe integration.","difficulty": "Very Hard","duration": "4-6 weeks","skills": ["Next.js","TypeScript","Stripe"],"githubIdea": "nextjs-saas" }
        ]
      },
      "backend": {
        "beginner": [
          { "id": "p9","title": "REST API with Authentication","description": "Complete REST API with user registration, login, JWT tokens, and protected routes.","difficulty": "Easy-Medium","duration": "1 week","skills": ["Node.js","Express","JWT"],"githubIdea": "rest-api-auth" },
          { "id": "p10","title": "URL Shortener","description": "URL shortening service with custom slugs, click tracking, analytics, and Redis caching.","difficulty": "Easy","duration": "3-5 days","skills": ["Node.js","PostgreSQL","Redis"],"githubIdea": "url-shortener" }
        ],
        "intermediate": [
          { "id": "p11","title": "Real-time Notification System","description": "Push notification service using WebSockets, message queues, email notification, and dashboard.","difficulty": "Medium-Hard","duration": "2-3 weeks","skills": ["Node.js","Redis","WebSockets"],"githubIdea": "notification-system" }
        ],
        "advanced": [
          { "id": "p13","title": "Distributed Task Queue","description": "Build a Bull/BullMQ-based job queue with priorities, retries, rate limiting, and monitoring dashboard.","difficulty": "Hard","duration": "3-4 weeks","skills": ["Node.js","Redis","Docker"],"githubIdea": "task-queue" }
        ]
      },
      "datascience": {
        "beginner": [
          { "id": "p14","title": "EDA on Titanic Dataset","description": "Complete exploratory analysis with survival prediction, beautiful visualizations, and statistical insights.","difficulty": "Easy","duration": "3-5 days","skills": ["Python","Pandas","Matplotlib"],"githubIdea": "titanic-eda" },
          { "id": "p15","title": "Movie Recommendation System","description": "Content-based and collaborative filtering recommendation engine using MovieLens dataset.","difficulty": "Medium","duration": "1 week","skills": ["Python","Scikit-learn","Pandas"],"githubIdea": "movie-recommender" }
        ],
        "intermediate": [
          { "id": "p16","title": "Sentiment Analysis API","description": "Real-time sentiment analysis API with transformer models, FastAPI, Redis caching.","difficulty": "Medium-Hard","duration": "2-3 weeks","skills": ["PyTorch","FastAPI","NLP"],"githubIdea": "sentiment-api" }
        ],
        "advanced": [
          { "id": "p18","title": "AI Chat Application with RAG","description": "LLM-powered Q&A over custom documents using LangChain, vector database, and streaming responses.","difficulty": "Very Hard","duration": "3-4 weeks","skills": ["LangChain","LLMs","Pinecone"],"githubIdea": "rag-chatbot" }
        ]
      },
      "devops": {
        "beginner": [
          { "id": "p19","title": "Dockerized Multi-Service App","description": "Containerize a full-stack app with Docker Compose, multi-stage builds, and health checks.","difficulty": "Easy-Medium","duration": "1 week","skills": ["Docker","Bash","Networking"],"githubIdea": "docker-compose-app" },
          { "id": "p20","title": "CI/CD Pipeline Setup","description": "Automated GitHub Actions pipeline with testing, linting, Docker builds, and deployment to cloud.","difficulty": "Medium","duration": "3-5 days","skills": ["GitHub Actions","Docker","CI/CD"],"githubIdea": "cicd-pipeline" }
        ],
        "intermediate": [
          { "id": "p21","title": "Kubernetes Cluster Setup","description": "Deploy a microservices app on Kubernetes with Helm charts, autoscaling, and monitoring.","difficulty": "Hard","duration": "2-3 weeks","skills": ["Kubernetes","Helm","Prometheus"],"githubIdea": "k8s-microservices" }
        ],
        "advanced": [
          { "id": "p22","title": "Internal Developer Platform","description": "Build IDP with Backstage.io, self-service infrastructure, golden paths, and developer portal.","difficulty": "Very Hard","duration": "4-6 weeks","skills": ["Backstage","Terraform","Kubernetes"],"githubIdea": "internal-dev-platform" }
        ]
      },
      "fullstack": {
        "beginner": [
          { "id": "p23","title": "Blog Platform","description": "Full-stack blog with user auth, rich text editor, comments, likes, and responsive design.","difficulty": "Medium","duration": "2 weeks","skills": ["React","Node.js","MongoDB"],"githubIdea": "blog-platform" },
          { "id": "p24","title": "Social Media Clone","description": "Twitter/Instagram-like app with posts, follows, real-time feed, image uploads, and notifications.","difficulty": "Medium-Hard","duration": "3-4 weeks","skills": ["React","Node.js","Socket.io"],"githubIdea": "social-media-clone" }
        ],
        "intermediate": [
          { "id": "p25","title": "Project Management Tool","description": "Jira/Trello clone with boards, drag-and-drop tasks, team collaboration, and real-time updates.","difficulty": "Hard","duration": "4-5 weeks","skills": ["Next.js","TypeScript","PostgreSQL"],"githubIdea": "project-management" }
        ],
        "advanced": [
          { "id": "p26","title": "SaaS Multi-tenant Platform","description": "Complete SaaS with multi-tenancy, billing, admin portal, API rate limiting, and white-labeling.","difficulty": "Very Hard","duration": "6-8 weeks","skills": ["Next.js","TypeScript","Stripe"],"githubIdea": "saas-platform" }
        ]
      }
    },
    "badges": [
      { "id": "first-step","name": "First Step","icon": "🎯","description": "Completed your first roadmap step","threshold": 1,"type": "steps","color": "#6366f1" },
      { "id": "quarter-done","name": "Quarter Way","icon": "⚡","description": "Reached 25% completion","threshold": 25,"type": "progress","color": "#f59e0b" },
      { "id": "halfway-hero","name": "Halfway Hero","icon": "🔥","description": "Reached 50% completion","threshold": 50,"type": "progress","color": "#ef4444" },
      { "id": "almost-there","name": "Almost There","icon": "🚀","description": "Reached 75% completion","threshold": 75,"type": "progress","color": "#10b981" },
      { "id": "job-ready","name": "Job Ready!","icon": "👑","description": "100% roadmap completion!","threshold": 100,"type": "progress","color": "#f59e0b" },
      { "id": "skill-master","name": "Skill Master","icon": "🧠","description": "Completed 10 skills","threshold": 10,"type": "skills","color": "#8b5cf6" },
      { "id": "streak-3","name": "3-Day Streak","icon": "💫","description": "Logged in 3 days in a row","threshold": 3,"type": "streak","color": "#f59e0b" },
      { "id": "streak-7","name": "Week Warrior","icon": "⚔️","description": "Logged in 7 days in a row","threshold": 7,"type": "streak","color": "#ef4444" },
      { "id": "level-up","name": "Level Up!","icon": "🌟","description": "Advanced to Intermediate level","threshold": 1,"type": "level","color": "#6366f1" }
    ],
    "aiResponses": {
      "greetings": ["Hello! I'm your AI career advisor. How can I help you today?","Hi there! Ready to accelerate your tech career? Ask me anything!","Hey! I'm here to guide you on your learning journey. What's on your mind?"],
      "progress": {
        "low": ["You're just getting started — consistency is key! Try to learn at least 1 hour daily.","Everyone starts somewhere. Focus on the fundamentals and build strong roots."],
        "mid": ["You're making great progress! You've built a solid foundation.","Halfway there! This is where most people slow down — don't let that be you."],
        "high": ["Outstanding progress! You're close to job-ready status.","You're in the top tier of learners at this stage. Start applying to jobs!"]
      },
      "skills": ["Focus on learning [SKILL] next — it's the most in-demand skill in this area.","Building projects with [SKILL] will accelerate your learning 3x."],
      "career": {
        "frontend": "Frontend development is one of the most visually rewarding careers. Companies value React and Next.js expertise the most right now.",
        "backend": "Backend development offers excellent salary growth. Node.js and Python with cloud skills (AWS/GCP) are the hottest combination.",
        "datascience": "Data Science is booming with the AI revolution. Python, ML frameworks, and LLM experience are highly sought after.",
        "devops": "DevOps/Platform Engineering is critical for every company. Kubernetes and cloud certifications can significantly boost your salary.",
        "fullstack": "Full Stack development gives you the most job opportunities. The MERN/PERN stack with TypeScript and Next.js is the gold standard."
      }
    },
    "insights": {
      "scoreRanges": {
        "0-25": { "label": "Beginner Stage","message": "You're at the beginning of your journey. Focus on completing the foundational steps first.","color": "#ef4444","emoji": "🌱" },
        "26-50": { "label": "Building Skills","message": "Good progress! You've built a foundation. Now focus on practical projects to solidify knowledge.","color": "#f59e0b","emoji": "📚" },
        "51-75": { "label": "Intermediate Level","message": "You're well on your way! Focus on advanced topics and build production-quality projects.","color": "#6366f1","emoji": "⚡" },
        "76-99": { "label": "Job Ready Soon","message": "You're almost there! Polish your portfolio, practice interviews, and start applying.","color": "#10b981","emoji": "🚀" },
        "100": { "label": "Job Ready!","message": "Congratulations! You've completed the roadmap. Now it's time to nail those interviews!","color": "#f59e0b","emoji": "👑" }
      }
    },
    "skillDependencies": {
      "frontend": {
        "nodes": [
          { "id": "html","label": "HTML5","x": 50,"y": 30 },
          { "id": "css","label": "CSS3","x": 200,"y": 30 },
          { "id": "js","label": "JavaScript","x": 350,"y": 30 },
          { "id": "git","label": "Git","x": 125,"y": 130 },
          { "id": "responsive","label": "Responsive","x": 200,"y": 130 },
          { "id": "react","label": "React","x": 350,"y": 130 },
          { "id": "ts","label": "TypeScript","x": 480,"y": 130 },
          { "id": "nextjs","label": "Next.js","x": 420,"y": 230 },
          { "id": "testing","label": "Testing","x": 280,"y": 230 },
          { "id": "perf","label": "Performance","x": 150,"y": 230 }
        ],
        "edges": [
          { "from": "html","to": "css" },{ "from": "css","to": "js" },{ "from": "html","to": "git" },
          { "from": "css","to": "responsive" },{ "from": "js","to": "react" },{ "from": "js","to": "ts" },
          { "from": "react","to": "nextjs" },{ "from": "ts","to": "nextjs" },{ "from": "react","to": "testing" },
          { "from": "responsive","to": "perf" }
        ]
      },
      "backend": {
        "nodes": [
          { "id": "python","label": "Python/JS","x": 50,"y": 30 },
          { "id": "http","label": "HTTP","x": 200,"y": 30 },
          { "id": "nodejs","label": "Node.js","x": 380,"y": 30 },
          { "id": "sql","label": "SQL","x": 125,"y": 130 },
          { "id": "nosql","label": "NoSQL","x": 290,"y": 130 },
          { "id": "rest","label": "REST API","x": 430,"y": 130 },
          { "id": "docker","label": "Docker","x": 200,"y": 230 },
          { "id": "cloud","label": "Cloud","x": 360,"y": 230 },
          { "id": "graphql","label": "GraphQL","x": 500,"y": 230 }
        ],
        "edges": [
          { "from": "python","to": "http" },{ "from": "http","to": "nodejs" },{ "from": "python","to": "sql" },
          { "from": "nodejs","to": "nosql" },{ "from": "nodejs","to": "rest" },{ "from": "sql","to": "docker" },
          { "from": "docker","to": "cloud" },{ "from": "rest","to": "graphql" }
        ]
      }
    }
  };
}

function initGreeting() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greetingText').textContent = `${greet}, ${state.profileName}! 👋`;
  const subs = ['Ready to level up your skills today?', 'Keep up the momentum!', 'One step at a time to your dream job.', 'Consistency is the key to mastery.'];
  document.getElementById('greetingSubtext').textContent = subs[Math.floor(Math.random() * subs.length)];
}

function initParticles() {
  const container = document.getElementById('bgParticles');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 15 + 10}s;animation-delay:${Math.random() * 10}s;opacity:${Math.random() * 0.4 + 0.1}`;
    container.appendChild(p);
  }
}

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const section = item.dataset.section;
      navigateTo(section);
      if (window.innerWidth <= 900) closeMobileSidebar();
    });
  });
}

function navigateTo(sectionId) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const navEl = document.getElementById(`nav-${sectionId}`);
  const sectionEl = document.getElementById(`section-${sectionId}`);
  if (navEl) navEl.classList.add('active');
  if (sectionEl) {
    sectionEl.classList.add('active');
    sectionEl.style.animation = 'none';
    requestAnimationFrame(() => { sectionEl.style.animation = ''; });
  }
  if (sectionId === 'progress') { updateProgressUI(); initChart(); }
  if (sectionId === 'insights') renderInsights();
  if (sectionId === 'skillgraph') renderSkillGraph(state.currentGraphCareer);
  if (sectionId === 'projects') renderProjects();
  if (sectionId === 'compare') runCompare();
}

function initSidebar() {
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
  });
  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('mobile-open');
    document.getElementById('mobileOverlay').classList.add('active');
  });
  document.getElementById('mobileOverlay').addEventListener('click', closeMobileSidebar);
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('mobileOverlay').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) generateBtn.addEventListener('click', handleGenerateRoadmap);
  }, 500);
});

async function handleGenerateRoadmap() {
  const career = document.getElementById('careerSelect').value;
  const level = document.getElementById('levelSelect').value;
  if (!career || !level) {
    showToast('Please select both a career role and experience level.', 'warning');
    return;
  }
  const btn = document.getElementById('generateBtn');
  const textEl = btn.querySelector('.btn-generate-text');
  const loaderEl = btn.querySelector('.btn-loader');
  textEl.classList.add('hidden');
  loaderEl.classList.remove('hidden');
  btn.disabled = true;

  const timeline = document.getElementById('roadmapTimeline');
  timeline.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const sk = document.createElement('div');
    sk.className = 'skeleton-step';
    timeline.appendChild(sk);
  }
  document.getElementById('roadmapContainer').classList.remove('hidden');

  await delay(1800);
  generateRoadmap(career, level);

  textEl.classList.remove('hidden');
  loaderEl.classList.add('hidden');
  btn.disabled = false;
}


function generateRoadmap(role, level) {
  if (!state.data?.careers?.[role]) return;
  state.currentCareer = role;
  state.currentLevel = level;
  state.completedSteps = new Set();
  state.completedSkills = new Set();

  const careerData = state.data.careers[role];
  const levelData = careerData.levels[level];
  if (!levelData) return;

  document.getElementById('roadmapTitle').textContent = `${careerData.title} Roadmap`;
  document.getElementById('roadmapBadge').textContent = levelData.label;
  document.getElementById('activeCareer').textContent = careerData.title;
  document.getElementById('careerLevel').textContent = `${levelData.label} Level`;
  document.getElementById('profileCareerLabel').textContent = careerData.title;

  renderTimeline(levelData.roadmap);
  updateProgressUI();
  updateGamification();
  updateInsightBanner();
  renderProjects();
  updateChatContext();
  addActivity(`Started <strong>${careerData.title}</strong> – ${levelData.label} roadmap`, careerData.color);
  logXP(100, 'Roadmap generated!');
}


function renderTimeline(steps) {
  const container = document.getElementById('roadmapTimeline');
  container.innerHTML = '';
  steps.forEach((step, idx) => {
    const isCompleted = state.completedSteps.has(step.id);
    const el = document.createElement('div');
    el.className = `timeline-step${isCompleted ? ' completed' : ''}`;
    el.style.animationDelay = `${idx * 0.1}s`;
    el.innerHTML = `
      <div class="step-indicator">
        <div class="step-num">${isCompleted ? '✓' : step.step}</div>
      </div>
      <div class="step-content">
        <div class="step-header">
          <div class="step-title-group">
            <div class="step-category">${step.category}</div>
            <div class="step-title">${step.title}</div>
          </div>
          <button class="step-toggle" data-id="${step.id}" aria-label="Toggle step completion" title="${isCompleted ? 'Mark incomplete' : 'Mark complete'}">
            ${isCompleted ? '✓' : '○'}
          </button>
        </div>
        <p class="step-desc">${step.description}</p>
        <div class="step-meta">
          <div class="step-duration">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            ${step.duration}
          </div>
          <div class="step-skills">${step.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
        </div>
        <div class="step-resources">${step.resources.map(r => `<span class="resource-tag">📚 ${r}</span>`).join('')}</div>
      </div>`;
    container.appendChild(el);
    el.querySelector('.step-toggle').addEventListener('click', () => toggleStep(step));
  });
}

function toggleStep(step) {
  const isNowCompleted = !state.completedSteps.has(step.id);
  if (isNowCompleted) {
    state.completedSteps.add(step.id);
    step.skills.forEach(s => state.completedSkills.add(s));
    logXP(50, `Step: ${step.title}`);
    addActivity(`Completed <strong>${step.title}</strong>`, '#10b981');
  } else {
    state.completedSteps.delete(step.id);
    step.skills.forEach(s => state.completedSkills.delete(s));
    addActivity(`Uncompleted <strong>${step.title}</strong>`, '#f59e0b');
  }
  const levelData = state.data.careers[state.currentCareer].levels[state.currentLevel];
  renderTimeline(levelData.roadmap);
  updateProgressUI();
  updateGamification();
  checkBadges();
  updateInsightBanner();
  updateChatContext();
}

function resetRoadmap() {
  state.completedSteps.clear();
  state.completedSkills.clear();
  const levelData = state.data.careers[state.currentCareer]?.levels[state.currentLevel];
  if (levelData) renderTimeline(levelData.roadmap);
  updateProgressUI();
  updateGamification();
}

function calculateScore(skillsCompleted, totalSkills) {
  if (!totalSkills) return 0;
  return Math.round((skillsCompleted / totalSkills) * 100);
}

function updateProgressUI() {
  if (!state.currentCareer || !state.currentLevel || !state.data) return;
  const careerData = state.data.careers[state.currentCareer];
  const levelData = careerData.levels[state.currentLevel];
  const totalSteps = levelData.roadmap.length;
  const doneSteps = state.completedSteps.size;
  const totalSkills = levelData.requiredSkills.length;
  const doneSkills = levelData.requiredSkills.filter(s => state.completedSkills.has(s)).length;
  const score = calculateScore(doneSkills, totalSkills);
  const stepPct = calculateScore(doneSteps, totalSteps);

  document.getElementById('readinessScore').textContent = `${score}%`;
  document.getElementById('readinessTrend').textContent = getScoreLabel(score).label;
  document.getElementById('progressPct').textContent = `${stepPct}%`;
  document.getElementById('progressTrend').textContent = `${doneSteps} of ${totalSteps} steps completed`;

  const circumference = 150.8;
  const offset = circumference - (score / 100) * circumference;
  document.getElementById('miniRingCircle').style.strokeDashoffset = offset;

  document.getElementById('statMiniBar').style.width = `${stepPct}%`;

  const scoreCirc = 502.65;
  const scoreOffset = scoreCirc - (score / 100) * scoreCirc;
  document.getElementById('scoreCircle').style.strokeDashoffset = scoreOffset;
  document.getElementById('scoreNumber').textContent = score;
  const scoreInfo = getScoreLabel(score);
  document.getElementById('scoreLabelText').textContent = scoreInfo.label;
  document.getElementById('insightEmoji').textContent = scoreInfo.emoji;
  document.getElementById('insightMessage').textContent = scoreInfo.message;

  document.getElementById('statCompleted').textContent = doneSkills;
  document.getElementById('statMissing').textContent = totalSkills - doneSkills;
  document.getElementById('statTotal').textContent = totalSkills;
  document.getElementById('statSteps').textContent = doneSteps;

  renderProgressBars(levelData.roadmap);

  renderSkillGap(levelData.requiredSkills);

  if (document.getElementById('section-progress').classList.contains('active')) initChart();
}

function getScoreLabel(score) {
  if (!state.data) return { label: 'Not Started', emoji: '🌱', message: 'Start your journey!', color: '#6366f1' };
  const ranges = state.data.insights.scoreRanges;
  if (score === 100) return ranges['100'];
  if (score >= 76) return ranges['76-99'];
  if (score >= 51) return ranges['51-75'];
  if (score >= 26) return ranges['26-50'];
  return ranges['0-25'];
}

function renderProgressBars(roadmap) {
  const container = document.getElementById('progressBarsList');
  container.innerHTML = '';
  roadmap.forEach(step => {
    const done = state.completedSteps.has(step.id);
    const pct = done ? 100 : 0;
    const div = document.createElement('div');
    div.className = 'prog-bar-item';
    div.innerHTML = `
      <div class="prog-bar-label">
        <span class="prog-bar-name">${step.title}</span>
        <span class="prog-bar-pct">${pct}%</span>
      </div>
      <div class="prog-bar-track">
        <div class="prog-bar-fill ${done ? 'green' : ''}" style="width:0%"></div>
      </div>`;
    container.appendChild(div);
    requestAnimationFrame(() => setTimeout(() => {
      div.querySelector('.prog-bar-fill').style.width = `${pct}%`;
    }, 100));
  });
}

function renderSkillGap(requiredSkills) {
  const grid = document.getElementById('skillGapGrid');
  const gapBadge = document.getElementById('gapBadge');
  const missing = requiredSkills.filter(s => !state.completedSkills.has(s));
  const have = requiredSkills.filter(s => state.completedSkills.has(s));
  gapBadge.textContent = `${missing.length} gaps found`;
  grid.innerHTML = have.map(s => `<span class="gap-skill-tag have">✓ ${s}</span>`).join('') +
    missing.map(s => `<span class="gap-skill-tag missing">✗ ${s}</span>`).join('');
  renderGapSuggestions(missing.slice(0, 3));
}

function renderGapSuggestions(missing) {
  const el = document.getElementById('gapSuggestions');
  if (!missing.length) { el.innerHTML = '<div class="gap-suggestion-item">🎉 <strong>All skills covered!</strong> You\'re job ready for this level.</div>'; return; }
  el.innerHTML = missing.map(skill => `
    <div class="gap-suggestion-item">
      💡 <strong>Focus on ${skill}:</strong> This skill is required and currently missing from your progress. Search for "${skill} tutorial" on YouTube or visit the roadmap step that covers it.
    </div>`).join('');
}

function initChart() {
  if (!state.currentCareer || !state.currentLevel || !state.data) return;
  const levelData = state.data.careers[state.currentCareer].levels[state.currentLevel];
  const required = levelData.requiredSkills;
  const done = required.filter(s => state.completedSkills.has(s));
  const missing = required.length - done.length;
  const ctx = document.getElementById('skillsChart');
  if (!ctx) return;
  if (state.chart) { state.chart.destroy(); state.chart = null; }
  state.chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Missing'],
      datasets: [{
        data: [done.length || 0, missing || required.length],
        backgroundColor: ['rgba(16,185,129,0.8)', 'rgba(99,102,241,0.3)'],
        borderColor: ['rgba(16,185,129,1)', 'rgba(99,102,241,0.5)'],
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '72%',
      plugins: {
        legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 }, padding: 16 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} skills` } }
      },
      animation: { animateRotate: true, animateScale: true, duration: 1200, easing: 'easeInOutQuart' }
    }
  });
}

function generateInsights(score, gaps) {
  const insights = [];
  const info = getScoreLabel(score);
  insights.push({ icon: info.emoji, title: `You're at ${score}% Readiness`, body: info.message, tag: info.label, tagColor: info.color });
  if (state.currentCareer && state.data?.aiResponses?.career?.[state.currentCareer]) {
    insights.push({ icon: '💼', title: 'Career Insight', body: state.data.aiResponses.career[state.currentCareer], tag: 'Market Intel', tagColor: '#f59e0b' });
  }
  if (gaps > 0) {
    insights.push({ icon: '⚡', title: `${gaps} Skill Gaps to Close`, body: `You have ${gaps} missing skills for your target role. Focus on completing roadmap steps to fill these gaps and increase your readiness score.`, tag: 'Action Required', tagColor: '#ef4444' });
  }
  if (score >= 50) {
    insights.push({ icon: '🏗️', title: 'Time to Build Projects', body: `Now that you've covered ${score}% of the roadmap, start building real projects. Projects are the #1 thing that impresses employers.`, tag: 'Pro Tip', tagColor: '#10b981' });
  }
  if (score >= 75) {
    insights.push({ icon: '🚀', title: 'Start Job Applications', body: 'At 75%+ readiness, you should start applying! Many companies value candidates who are still learning. Get interview experience now.', tag: 'Career Move', tagColor: '#6366f1' });
  }
  insights.push({ icon: '📅', title: 'Daily Learning Habit', body: `Your ${state.streak}-day streak is amazing! Studies show that 1 hour of focused daily practice beats 6 hours of weekend cramming by 3x in knowledge retention.`, tag: 'Learning Science', tagColor: '#8b5cf6' });
  if (state.xp >= 200) {
    insights.push({ icon: '🧠', title: `${state.xp} XP Earned!`, body: 'You\'ve built serious momentum. Remember: consistency over intensity. Keep showing up every day and success is inevitable.', tag: 'Motivation', tagColor: '#06b6d4' });
  }
  return insights;
}

function renderInsights() {
  const grid = document.getElementById('insightsGrid');
  if (!state.currentCareer || !state.currentLevel) {
    grid.innerHTML = `<div class="glass-card insight-card"><div class="insight-card-icon">🗺️</div><div class="insight-card-title">Generate a Roadmap First</div><div class="insight-card-body">Select a career and level in "Generate Roadmap" to unlock personalized AI insights.</div></div>`;
    return;
  }
  const levelData = state.data.careers[state.currentCareer].levels[state.currentLevel];
  const totalSkills = levelData.requiredSkills.length;
  const doneSkills = levelData.requiredSkills.filter(s => state.completedSkills.has(s)).length;
  const score = calculateScore(doneSkills, totalSkills);
  const gaps = totalSkills - doneSkills;
  const insights = generateInsights(score, gaps);
  grid.innerHTML = insights.map(ins => `
    <div class="glass-card insight-card">
      <div class="insight-card-icon">${ins.icon}</div>
      <div class="insight-card-title">${ins.title}</div>
      <div class="insight-card-body">${ins.body}</div>
      <span class="insight-card-tag" style="background:${ins.tagColor}22;color:${ins.tagColor};border:1px solid ${ins.tagColor}33">${ins.tag}</span>
    </div>`).join('');
}

function updateGamification() {
  const levels = [
    { name: 'Beginner', min: 0, max: 500, color: '#6366f1' },
    { name: 'Intermediate', min: 500, max: 1500, color: '#f59e0b' },
    { name: 'Pro', min: 1500, max: 3000, color: '#10b981' },
    { name: 'Expert', min: 3000, max: 99999, color: '#ef4444' }
  ];
  const lvl = levels.find(l => state.xp >= l.min && state.xp < l.max) || levels[0];
  const nextLvl = levels[levels.indexOf(lvl) + 1];
  const xpInLevel = state.xp - lvl.min;
  const xpRange = (nextLvl?.min || lvl.max) - lvl.min;
  const pct = Math.min(100, Math.round((xpInLevel / xpRange) * 100));

  document.getElementById('sidebarLevel').textContent = lvl.name;
  document.getElementById('sidebarXPBar').style.width = `${pct}%`;
  document.getElementById('sidebarXP').textContent = `${state.xp} XP`;
  document.getElementById('sidebarXPNext').textContent = nextLvl ? `${nextLvl.min} XP` : 'MAX';
  document.getElementById('totalXP').textContent = state.xp;
  document.getElementById('xpTrend').textContent = `Level: ${lvl.name} (${pct}% to next)`;

  const cards = document.getElementById('gamificationCards');
  if (cards) {
    cards.innerHTML = `
      <div class="glass-card gmc-card">
        <div class="gmc-icon">⚡</div>
        <div class="gmc-val">${state.xp}</div>
        <div class="gmc-label">Total XP</div>
        <span class="level-badge" style="background:${lvl.color}22;color:${lvl.color}">${lvl.name}</span>
      </div>
      <div class="glass-card gmc-card">
        <div class="gmc-icon">🔥</div>
        <div class="gmc-val">${state.streak}</div>
        <div class="gmc-label">Day Streak</div>
      </div>
      <div class="glass-card gmc-card">
        <div class="gmc-icon">🏆</div>
        <div class="gmc-val">${state.earnedBadges.size}</div>
        <div class="gmc-label">Badges Earned</div>
      </div>
      <div class="glass-card gmc-card">
        <div class="gmc-icon">✅</div>
        <div class="gmc-val">${state.completedSteps.size}</div>
        <div class="gmc-label">Steps Completed</div>
      </div>`;
  }
}

function logXP(amount, reason) {
  state.xp += amount;
  showXPPopup(`+${amount} XP`);
  updateGamification();
  updateHeaderStats();
}

function showXPPopup(text) {
  const popup = document.getElementById('xpPopup');
  popup.textContent = text + ' ⚡';
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 2000);
}

function updateHeaderStats() {
  document.getElementById('headerStreak').textContent = `${state.streak}🔥`;
  document.getElementById('headerXP').textContent = state.xp;
  document.getElementById('headerBadges').textContent = state.earnedBadges.size;
}

function renderBadges() {
  const grid = document.getElementById('badgesGrid');
  if (!state.data?.badges) return;
  grid.innerHTML = state.data.badges.map(badge => {
    const earned = state.earnedBadges.has(badge.id);
    return `
      <div class="badge-item ${earned ? 'earned' : 'locked'}" data-id="${badge.id}">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.description}</div>
        ${earned ? '<div class="badge-check">✓</div>' : ''}
      </div>`;
  }).join('');
  document.getElementById('badgeCount').textContent = `${state.earnedBadges.size} earned`;
}

function checkBadges() {
  if (!state.data?.badges) return;
  const levelData = state.currentCareer && state.currentLevel ? state.data.careers[state.currentCareer]?.levels[state.currentLevel] : null;
  const totalSkills = levelData?.requiredSkills?.length || 0;
  const doneSkills = totalSkills ? levelData.requiredSkills.filter(s => state.completedSkills.has(s)).length : 0;
  const score = calculateScore(doneSkills, totalSkills);
  state.data.badges.forEach(badge => {
    if (state.earnedBadges.has(badge.id)) return;
    let earned = false;
    if (badge.type === 'steps' && state.completedSteps.size >= badge.threshold) earned = true;
    if (badge.type === 'progress' && score >= badge.threshold) earned = true;
    if (badge.type === 'skills' && state.completedSkills.size >= badge.threshold) earned = true;
    if (badge.type === 'streak' && state.streak >= badge.threshold) earned = true;
    if (earned) {
      state.earnedBadges.add(badge.id);
      showBadgePopup(badge);
      renderBadges();
      logXP(75, `Badge: ${badge.name}`);
    }
  });
}

function showBadgePopup(badge) {
  document.getElementById('badgePopupIcon').textContent = badge.icon;
  document.getElementById('badgePopupName').textContent = badge.name;
  document.getElementById('badgePopupDesc').textContent = badge.description;
  const popup = document.getElementById('badgePopup');
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 4000);
}

function addActivity(text, color = '#6366f1') {
  const item = { text, color, time: new Date() };
  state.activityLog.unshift(item);
  if (state.activityLog.length > 10) state.activityLog.pop();
  renderActivity();
}

function renderActivity() {
  const list = document.getElementById('activityList');
  if (!state.activityLog.length) {
    list.innerHTML = `<div class="activity-empty"><div class="empty-icon">📋</div><p>No activity yet. Start by generating a roadmap!</p></div>`;
    return;
  }
  list.innerHTML = state.activityLog.map(a => `
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color}"></div>
      <div class="activity-text">${a.text}</div>
      <div class="activity-time">${formatTime(a.time)}</div>
    </div>`).join('');
}

function updateInsightBanner() {
  if (!state.currentCareer || !state.currentLevel || !state.data) return;
  const levelData = state.data.careers[state.currentCareer].levels[state.currentLevel];
  const totalSkills = levelData.requiredSkills.length;
  const doneSkills = levelData.requiredSkills.filter(s => state.completedSkills.has(s)).length;
  const score = calculateScore(doneSkills, totalSkills);
  const banner = document.getElementById('insightBanner');
  const info = getScoreLabel(score);
  banner.querySelector('.insight-icon').textContent = info.emoji;
  banner.querySelector('.insight-text').innerHTML = `<strong>${info.label}:</strong> ${info.message}`;
}

function renderCareersPreview() {
  if (!state.data?.careers) return;
  const container = document.getElementById('careersPreview');
  container.innerHTML = Object.entries(state.data.careers).map(([key, c]) => `
    <div class="career-preview-card" data-career="${key}" onclick="quickSelectCareer('${key}')">
      <div class="cpcard-icon">${c.icon}</div>
      <div class="cpcard-title">${c.title}</div>
      <div class="cpcard-salary">${c.avgSalary}/yr</div>
      <div class="cpcard-time">⏱ ${c.timeToJob}</div>
    </div>`).join('');
}

function quickSelectCareer(career) {
  document.getElementById('careerSelect').value = career;
  document.getElementById('careerSelect').dispatchEvent(new Event('change'));
}

function generateProjects(role, level) {
  if (!state.data?.projects?.[role]) return [];
  const levelProjects = state.data.projects[role][level] || [];
  const allForRole = [...(state.data.projects[role].beginner || []), ...(state.data.projects[role].intermediate || []), ...(state.data.projects[role].advanced || [])];
  return levelProjects.length ? levelProjects : allForRole.slice(0, 3);
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const filterEl = document.getElementById('projectsFilter');
  if (!state.currentCareer || !state.currentLevel || !state.data) {
    grid.innerHTML = '<div class="empty-state-sm">Generate a roadmap first to see personalized project ideas.</div>';
    return;
  }
  const projects = generateProjects(state.currentCareer, state.currentLevel);
  filterEl.innerHTML = `<button class="filter-btn active">All</button><button class="filter-btn">Easy</button><button class="filter-btn">Medium</button><button class="filter-btn">Hard</button>`;
  filterEl.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  if (!projects.length) { grid.innerHTML = '<div class="empty-state-sm">No projects found for this level.</div>'; return; }
  grid.innerHTML = projects.map(p => {
    const diff = p.difficulty.toLowerCase();
    const diffClass = diff.includes('very') || diff.includes('hard') ? 'hard' : diff.includes('medium') ? 'medium' : 'easy';
    return `
      <div class="project-card">
        <div class="proj-header">
          <div class="proj-title">🏗️ ${p.title}</div>
          <div class="proj-difficulty ${diffClass}">${p.difficulty}</div>
        </div>
        <p class="proj-desc">${p.description}</p>
        <div class="proj-meta">
          <span class="proj-duration">⏱ ${p.duration}</span>
          <div class="proj-skills">${p.skills.map(s => `<span class="proj-skill">${s}</span>`).join('')}</div>
        </div>
      </div>`;
  }).join('');
}

function initCompare() {
  runCompare();
}

function runCompare() {
  if (!state.data?.careers) return;
  const a = document.getElementById('compareA').value;
  const b = document.getElementById('compareB').value;
  const grid = document.getElementById('compareCardsGrid');
  const ca = state.data.careers[a];
  const cb = state.data.careers[b];
  if (!ca || !cb) return;
  grid.innerHTML = [ca, cb].map((c, i) => `
    <div class="compare-card" style="border-color:${i===0?'rgba(99,102,241,0.25)':'rgba(16,185,129,0.25)'}">
      <div class="cc-header">
        <div class="cc-icon">${c.icon}</div>
        <div>
          <div class="cc-title">${c.title}</div>
          <div class="cc-meta">${c.difficulty} • ${c.demandLevel} Demand</div>
        </div>
      </div>
      <div class="cc-stats">
        <div class="cc-stat"><span class="cc-stat-label">💰 Avg Salary</span><span class="cc-stat-val" style="color:${i===0?'#6366f1':'#10b981'}">${c.avgSalary}</span></div>
        <div class="cc-stat"><span class="cc-stat-label">⏱ Time to Job</span><span class="cc-stat-val">${c.timeToJob}</span></div>
        <div class="cc-stat"><span class="cc-stat-label">📊 Demand Level</span><span class="cc-stat-val">${c.demandLevel}</span></div>
        <div class="cc-stat"><span class="cc-stat-label">🎯 Difficulty</span><span class="cc-stat-val">${c.difficulty}</span></div>
        <div class="cc-stat"><span class="cc-stat-label">📚 Total Skills (Beg)</span><span class="cc-stat-val">${c.levels.beginner.totalSkills}</span></div>
      </div>
      <div class="cc-skills-title">Top Beginner Skills</div>
      <div class="cc-skills">${c.levels.beginner.requiredSkills.slice(0,8).map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
    </div>`).join('');
}

function initSkillGraph() {
  renderSkillGraph('frontend');
}

function renderSkillGraph(career) {
  const svgEl = document.getElementById('skillGraphSVG');
  if (!state.data?.skillDependencies?.[career]) { svgEl.innerHTML = '<text fill="#64748b" x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="14">No graph data for this career</text>'; return; }
  const { nodes, edges } = state.data.skillDependencies[career];
  const completedSkillNames = [...state.completedSkills].map(s => s.toLowerCase());
  let html = '<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="rgba(99,102,241,0.5)"/></marker></defs>';

  edges.forEach(e => {
    const from = nodes.find(n => n.id === e.from);
    const to = nodes.find(n => n.id === e.to);
    if (!from || !to) return;
    const sx = from.x * 1.05 + 35, sy = from.y * 1.05 + 45, tx = to.x * 1.05 + 35, ty = to.y * 1.05 + 45;
    html += `<line x1="${sx}" y1="${sy}" x2="${tx}" y2="${ty}" stroke="rgba(99,102,241,0.25)" stroke-width="1.5" marker-end="url(#arrow)"/>`;
  });

  nodes.forEach(n => {
    const x = n.x * 1.05 + 5, y = n.y * 1.05 + 20;
    const isCompleted = completedSkillNames.some(s => s.includes(n.label.toLowerCase()) || n.label.toLowerCase().includes(s));
    const fill = isCompleted ? 'rgba(16,185,129,0.25)' : 'rgba(99,102,241,0.15)';
    const stroke = isCompleted ? '#10b981' : '#6366f1';
    const textColor = isCompleted ? '#10b981' : '#a5b4fc';
    html += `
      <g class="sg-node" style="cursor:pointer">
        <rect x="${x}" y="${y}" width="90" height="36" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
        <text x="${x+45}" y="${y+23}" text-anchor="middle" fill="${textColor}" font-size="11" font-weight="600" font-family="Inter">${n.label}</text>
        ${isCompleted ? `<circle cx="${x+82}" cy="${y+8}" r="6" fill="#10b981"/><text x="${x+82}" y="${y+12}" text-anchor="middle" fill="#fff" font-size="8">✓</text>` : ''}
      </g>`;
  });

  svgEl.innerHTML = html;
}

function initChat() {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  sendBtn.addEventListener('click', () => sendChatMessage(input.value));
  input.addEventListener('keypress', e => { if (e.key === 'Enter') sendChatMessage(input.value); });
  document.querySelectorAll('.quick-btn').forEach(btn => btn.addEventListener('click', () => sendChatMessage(btn.dataset.msg)));
}

function initChatFloat() {
  const input = document.getElementById('cfpInput');
  document.getElementById('cfpSendBtn').addEventListener('click', () => sendFloatMessage(input.value));
  input.addEventListener('keypress', e => { if (e.key === 'Enter') sendFloatMessage(input.value); });
  document.getElementById('chatCloseBtn').addEventListener('click', () => document.getElementById('chatFloatPanel').classList.remove('open'));
}

function sendChatMessage(text) {
  if (!text?.trim()) return;
  const input = document.getElementById('chatInput');
  input.value = '';
  appendChatMsg('user', text, 'chatMessages');
  setTimeout(() => {
    const reply = generateAIResponse(text);
    appendChatMsg('ai', reply, 'chatMessages');
  }, 900);
}

function sendFloatMessage(text) {
  if (!text?.trim()) return;
  document.getElementById('cfpInput').value = '';
  const msgs = document.getElementById('cfpMessages');
  const userEl = document.createElement('div');
  userEl.className = 'cfp-msg user';
  userEl.innerHTML = `<div class="cfp-bubble">${text}</div>`;
  msgs.appendChild(userEl);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    const reply = generateAIResponse(text);
    const aiEl = document.createElement('div');
    aiEl.className = 'cfp-msg ai';
    aiEl.innerHTML = `<div class="cfp-bubble">${reply}</div>`;
    msgs.appendChild(aiEl);
    msgs.scrollTop = msgs.scrollHeight;
  }, 700);
}

function appendChatMsg(type, text, containerId) {
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = `chat-msg ${type === 'ai' ? 'ai-msg' : 'user-msg'}`;
  div.innerHTML = `
    <div class="msg-avatar">${type === 'ai' ? '🤖' : '👤'}</div>
    <div class="msg-bubble"><p>${text}</p><span class="msg-time">${formatTime(new Date())}</span></div>`;
  if (type === 'ai') {
    const typing = document.createElement('div');
    typing.className = 'chat-msg ai-msg';
    typing.innerHTML = `<div class="msg-avatar">🤖</div><div class="msg-bubble"><div class="chat-typing"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
    setTimeout(() => { container.removeChild(typing); container.appendChild(div); container.scrollTop = container.scrollHeight; }, 800);
  } else {
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }
}

function generateAIResponse(msg) {
  const m = msg.toLowerCase();
  const career = state.currentCareer;
  const level = state.currentLevel;
  const score = getReadinessScore();
  const xp = state.xp;
  const steps = state.completedSteps.size;

  if (m.includes('skill') && m.includes('focus')) {
    if (!career || !state.data?.careers?.[career]) return "Please generate a roadmap first, then I can give you personalized skill recommendations! 🗺️";
    const levelData = state.data.careers[career].levels[level];
    const missing = levelData.requiredSkills.filter(s => !state.completedSkills.has(s));
    if (!missing.length) return "🎉 Amazing! You've covered all required skills for this level. Consider advancing to the next level!";
    return `Based on your ${state.data.careers[career].title} path, focus on these skills next: <strong>${missing.slice(0,3).join(', ')}</strong>. These are the most in-demand and will boost your readiness score the most. 💡`;
  }
  if (m.includes('readiness') || m.includes('score') || m.includes('improve')) {
    if (score === 0) return "Generate a roadmap first and start completing steps to build your readiness score! Each step you complete adds to your skill score. 🎯";
    if (score < 30) return `You're at ${score}% readiness — great start! 🌱 Complete more roadmap steps, focus on core fundamentals, and try building a small project. Consistency is everything at this stage.`;
    if (score < 70) return `At ${score}% readiness, you're making solid progress! ⚡ Focus on the advanced topics in your roadmap and start building portfolio projects. Recruiters love seeing real work.`;
    return `Impressive! At ${score}% readiness you're nearly job-ready! 🚀 Polish your portfolio, prep for interviews (LeetCode for DSA, system design basics), and start applying. Don't wait for 100%.`;
  }
  if (m.includes('career') && (m.includes('advice') || m.includes('path'))) {
    if (!career || !state.data?.aiResponses?.career?.[career]) return "Generate a roadmap first to get personalized career advice! Tell me which role interests you and I'll guide you. 🎯";
    return state.data.aiResponses.career[career] + " Your current progress shows great commitment! 💪";
  }
  if (m.includes('project') || m.includes('build')) {
    if (!career || !level) return "Generate a roadmap first and I'll suggest specific projects tailored to your career and level! 🏗️";
    const projects = generateProjects(career, level);
    if (!projects.length) return "Check the Projects section for ideas tailored to your career and level! 🏗️";
    return `Here are some great projects for your level: <strong>${projects.slice(0,2).map(p => p.title).join(', ')}</strong>. Building projects is the fastest way to go from \"knowing\" to \"doing\" — and employers love seeing code! 🚀`;
  }
  if (m.includes('how long') || m.includes('time') || (m.includes('job') && m.includes('ready'))) {
    if (!career || !state.data?.careers?.[career]) return "Generate a roadmap and I'll give you a personalized time estimate! ⏱";
    const c = state.data.careers[career];
    return `As a ${c.title}, the typical timeline is <strong>${c.timeToJob}</strong> from beginner to job-ready. With your current ${score}% readiness and ${xp} XP, you're making ${score > 40 ? 'great' : 'steady'} progress! Daily practice of 1-2 hours will get you there faster. ⏱`;
  }
  if (m.includes('hello') || m.includes('hi') || m.includes('hey')) {
    const greets = state.data?.aiResponses?.greetings || ["Hello! How can I help?"];
    return greets[Math.floor(Math.random() * greets.length)];
  }
  if (m.includes('salary') || m.includes('money') || m.includes('pay')) {
    if (career && state.data?.careers?.[career]) return `${state.data.careers[career].title} typically earns <strong>${state.data.careers[career].avgSalary}/year</strong> on average. Senior roles can earn significantly more! Salary grows with experience, specialization, and location (remote US roles pay the most). 💰`;
    return "Tech salaries vary by role: Frontend ($70-120k), Backend ($80-130k), Full Stack ($85-140k), Data Science ($90-150k), DevOps ($90-140k). Location and experience matter a lot! 💰";
  }
  if (m.includes('interview') || m.includes('prepare') || m.includes('prep')) {
    return `Interview prep tip for ${score > 0 ? 'your level' : 'tech jobs'}: <br>1. <strong>LeetCode</strong> – 50 easy/medium problems<br>2. <strong>System Design</strong> – YouTube: "System Design Primer"<br>3. <strong>Projects</strong> – Always have 2-3 portfolio projects<br>4. <strong>Behavioral</strong> – STAR method for soft skills<br>Start 4-6 weeks before applying! 🎯`;
  }
  if (m.includes('motivation') || m.includes('stuck') || m.includes('hard')) {
    const msgs = ["Every expert was once a beginner. You've earned "+xp+" XP — that's not nothing, that's real progress! 💪", `You've completed ${steps} steps already! That's ${steps} more than most people who just think about starting. Keep going! 🔥`, "The tech industry pays well because it's hard. That difficulty is your competitive moat. Embrace the struggle! 🚀"];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }
  return `Great question! Based on your progress (${score}% readiness, ${xp} XP, ${steps} steps completed), I'd recommend focusing on your current roadmap steps. ${career ? `For ${state.data.careers[career].title}, the key is consistent daily practice.` : 'Start by generating a personalized roadmap!'} Ask me about skills, projects, career advice, or interview prep! 🤖`;
}

function getReadinessScore() {
  if (!state.currentCareer || !state.currentLevel || !state.data?.careers) return 0;
  const levelData = state.data.careers[state.currentCareer]?.levels[state.currentLevel];
  if (!levelData) return 0;
  const total = levelData.requiredSkills.length;
  const done = levelData.requiredSkills.filter(s => state.completedSkills.has(s)).length;
  return calculateScore(done, total);
}

function updateChatContext() {
  if (state.currentCareer && state.data?.careers?.[state.currentCareer]) {
    document.getElementById('ctxCareer').textContent = state.data.careers[state.currentCareer].title;
  }
  if (state.currentLevel) document.getElementById('ctxLevel').textContent = state.currentLevel.charAt(0).toUpperCase() + state.currentLevel.slice(1);
  document.getElementById('ctxReadiness').textContent = `${getReadinessScore()}%`;
  document.getElementById('ctxXP').textContent = state.xp;
}

function initProfileModal() {
  document.getElementById('editProfileBtn').addEventListener('click', () => document.getElementById('profileModal').classList.add('open'));
  document.getElementById('profileModalClose').addEventListener('click', () => document.getElementById('profileModal').classList.remove('open'));
  document.getElementById('profileCancelBtn').addEventListener('click', () => document.getElementById('profileModal').classList.remove('open'));
  document.getElementById('profileSaveBtn').addEventListener('click', () => {
    const name = document.getElementById('profileNameInput').value.trim() || state.profileName;
    state.profileName = name;
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileInitial').textContent = name.charAt(0).toUpperCase();
    initGreeting();
    document.getElementById('profileModal').classList.remove('open');
    showToast('Profile updated!', 'success');
  });
  document.getElementById('colorPicker').querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.profileColor = btn.dataset.color;
      document.getElementById('profileAvatar').style.background = `linear-gradient(135deg, ${state.profileColor}, ${state.profileColor}cc)`;
    });
  });
}

function showToast(message, type = 'info') {
  const colors = { info: '#6366f1', success: '#10b981', warning: '#f59e0b', error: '#ef4444' };
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);background:rgba(15,15,42,0.97);border:1px solid ${colors[type]};border-radius:12px;padding:12px 22px;color:#f1f5f9;font-size:14px;font-weight:500;z-index:500;box-shadow:0 8px 32px rgba(0,0,0,0.4);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);max-width:320px;text-align:center`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(80px)'; setTimeout(() => toast.remove(), 400); }, 2500);
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}