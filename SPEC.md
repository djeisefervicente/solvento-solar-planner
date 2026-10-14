# Especificação funcional — Solvento Solar Planner

## 1. Visão do produto

Aplicação responsiva para planejar layouts de painéis fotovoltaicos sobre telhados, primeiro como protótipo e depois como ferramenta mais completa para Android, computador e tablet.

## 2. Fluxos principais

### Projetos
- Criar uma obra com nome do cliente, endereço, data e notas.
- Salvar, listar, abrir e duplicar projetos.
- Cada projeto deve guardar medidas, imagem de referência, geometria do telhado, obstáculos, modelo de módulo e posições dos painéis.

### Telhado e medição
- Permitir inserir medidas manualmente.
- Permitir desenhar o contorno com mouse ou toque.
- Suportar retângulos e polígonos irregulares.
- Permitir importar imagem aérea/satélite como fundo.
- Para imagem importada, calibrar a escala a partir de uma distância real conhecida.
- Mostrar dimensões e área calculada, indicando quando os valores forem estimativas.

### Biblioteca de módulos
- Guardar fabricante, modelo, largura, comprimento e potência nominal em W.
- Permitir adicionar, editar e selecionar modelos salvos.
- Permitir orientação portrait/landscape e rotação do módulo.

### Layout de módulos
- Distribuição automática inicial.
- Edição manual: selecionar, mover, girar e remover.
- Excluir zonas de obstáculos/áreas proibidas e aplicar recuos e espaçamentos configuráveis.
- Mostrar contagem de módulos e potência nominal total em kWp.
- Não colocar módulos fora do contorno nem sobre obstáculos no algoritmo final.

### Saídas
- Planta cotada.
- Resumo com quantidade de módulos, modelo e potência nominal total.
- Exportar PNG.
- Gerar PDF adequado para imprimir/compartilhar.

### Idiomas e offline
- Interface em italiano e português brasileiro.
- A interface básica e projetos existentes devem estar acessíveis offline.
- Imagens remotas novas não podem ser obtidas offline; devem ser importadas/preparadas antes.
- Armazenamento local deve ter exportação/backup para evitar perda de projetos.

## 3. Requisitos não funcionais

- Interface responsiva para celular Android, tablet e computador.
- Controles de toque suficientemente grandes.
- Feedback claro de erro e validação de medidas.
- Persistência local robusta; não presumir sincronização sem backend.
- Código organizado e testável à medida que o projeto crescer.

## 4. Critérios de aceitação prioritários

1. Criar um projeto retangular com dimensões em metros.
2. Selecionar um módulo guardado e distribuir módulos sem ultrapassar o teto.
3. Mover/girar/remover módulos e ver a contagem/potência atualizadas.
4. Salvar e reabrir o projeto no mesmo dispositivo.
5. Exportar desenho como imagem e produzir PDF legível.
6. Alternar idioma italiano/português brasileiro.
7. Importar imagem, calibrar escala e traçar contorno manual.
8. Criar polígono irregular e obstáculos, e garantir que a distribuição respeite limites configurados.
9. Testar uso offline após a primeira abertura/preparação.

## 5. Ordem sugerida de desenvolvimento

1. Auditar o protótipo atual e corrigir eventuais erros.
2. Separar estrutura, estilos e lógica em módulos se isso melhorar a manutenção sem quebrar o protótipo.
3. Implementar editor de polígono e calibração da imagem.
4. Implementar obstáculos, recuos e distribuição por geometria.
5. Melhorar exportação PDF e relatórios.
6. Fortalecer persistência e criar exportação/importação de backup.
7. Adicionar PWA/offline e testar em dispositivos reais.
8. Avaliar sincronização e integração com fontes de imagens aéreas, respeitando termos/licenças.
