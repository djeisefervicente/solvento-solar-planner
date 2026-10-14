# Instruções para Claude Code — Solvento Solar Planner

Leia `README.md` e `SPEC.md` antes de modificar o código.

## Contexto do usuário
- O usuário fala português brasileiro e prefere instruções simples, passo a passo, sem presumir conhecimento de programação.
- O produto será usado no contexto de instalações fotovoltaicas na Itália.
- O nome de trabalho é Solvento Solar Planner.
- O usuário quer continuar o desenvolvimento neste repositório/pasta.

## Regras de desenvolvimento
1. Comece auditando `index.html`: identifique as funções presentes e os problemas reais antes de reescrever.
2. Preserve o que já funciona. Faça alterações pequenas e verificáveis; explique cada etapa em português brasileiro.
3. Mantenha a interface em italiano e português brasileiro.
4. Priorize responsividade e uso por toque em Android/tablet, além de desktop.
5. Não invente medições exatas a partir de imagens aéreas. Implemente calibração por distância conhecida e deixe a pessoa corrigir o contorno.
6. O algoritmo de distribuição deve respeitar o polígono do telhado, obstáculos, recuos e espaçamentos; se isso ainda não estiver implementado, indique claramente a limitação.
7. Não alegue que o protótipo é um projeto de engenharia validado. Inclua avisos de que estrutura, fixação, recuos e requisitos locais precisam de validação profissional.
8. Trate os dados locais com cuidado. Implemente exportação/importação de backup antes de mudanças que possam invalidar o formato dos projetos.
9. Não integre mapas ou imagens de terceiros sem verificar termos de uso, licenças e restrições de cache/download.
10. Não adicione dependências ou serviços pagos sem explicar por que são necessários e obter aprovação do usuário.

## Primeira tarefa sugerida
- Inspecione `index.html` e entregue um resumo curto do que já funciona, do que está quebrado e dos próximos três passos.
- Depois implemente apenas o próximo passo de maior valor: editor de contorno irregular do telhado com pontos editáveis e escala calibrável, mantendo o comportamento retangular existente.
- Teste os principais fluxos no navegador e documente como executar/testar localmente.
