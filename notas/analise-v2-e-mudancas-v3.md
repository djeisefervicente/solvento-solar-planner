# Solvento Solar Planner: análise da v2 e mudanças da v3

Data: 14/10/2026. Lembrete: este protótipo **não é um projeto de engenharia válido**. Estrutura, fixação, recuos e normas locais precisam de validação profissional.

## O que já funcionava na v2

- Interface em italiano e português, com troca de idioma.
- Telhado retangular por medidas (comprimento × largura), distância da borda e espaço entre painéis.
- Distribuição automática em grade, com orientação vertical/horizontal.
- Edição manual: selecionar, arrastar, girar 90° e remover painel.
- Contagem de painéis, potência em kWp, área do telhado e área dos módulos.
- Biblioteca local de modelos de painel.
- Salvar/abrir projetos no navegador (localStorage), incluindo a imagem de referência.
- Exportar PNG e imprimir/salvar PDF.
- Área excluída demonstrativa (retângulo central).

## Problemas encontrados na v2

1. **Arrastar no celular/tablet falhava**: o canvas usava `touch-action: pan-y`, então arrastar na vertical rolava a página e cancelava o arraste. *Corrigido na v3.*
2. **A imagem de fundo era esticada** para caber no retângulo do telhado, deformando a foto; isso impedia qualquer medição real. *Corrigido no modo polígono (a imagem mantém a proporção e a escala calibrada); o modo retângulo manteve o comportamento antigo.*
3. **Girar um painel podia jogá-lo para fora do telhado** sem aviso. *Agora painéis inválidos ficam vermelhos e aparece um aviso.*
4. **Não havia backup** dos projetos (perder o navegador = perder tudo). *Corrigido: exportar/importar .json.*
5. **O selo “PRONTO OFFLINE” não é real**: não existe service worker nem manifest. O arquivo funciona sem internet quando aberto localmente, mas não é instalável como app. *Ainda pendente.*
6. O estado automático (sem “Salvar projeto”) não guarda a imagem; ao recarregar, ela some. *Pendente, comportamento antigo mantido.*

## O que foi implementado na v3

- Seletor **Forma do telhado**: Retângulo ou Polígono irregular. Ao trocar para polígono, o contorno começa igual ao retângulo atual.
- **Pontos editáveis**: arrastar pontos, inserir ponto pelo “+” no meio de cada lado, excluir ponto, traçar um contorno novo ponto a ponto.
- **Medidas de cada lado** e área (marcada com ≈ por ser estimativa), linha tracejada do recuo da borda.
- **Calibração de escala**: duas pontas de uma distância conhecida na imagem + valor em metros. A linha de calibração fica desenhada com ✓.
- **Distribuição dentro do polígono** respeitando contorno, recuo e área excluída.
- **Backup** exportar/importar.
- Botões de toque maiores no topo do desenho e alças dimensionadas para dedo.
- Projetos antigos continuam abrindo (os campos novos são opcionais).

## Testes feitos (Chromium, desktop 1300 px e celular 390 px com toque)

- Retângulo 20 × 10 m: 63 módulos, igual à v2.
- Polígono em L traçado por toque: fechado, área calculada, distribuição sem painéis inválidos.
- Arrastar ponto, inserir pelo “+”, excluir ponto: OK.
- Importar imagem, calibrar com 25 m: escala e contorno atualizados, painéis fora do novo contorno ficam em vermelho.
- Salvar, voltar ao retângulo, reabrir o projeto: modo, contorno e calibração restaurados.
- Exportar backup e importar em navegador limpo: projeto recuperado.
- Nenhum erro de JavaScript no console.

Ainda não testado em aparelho Android real.

## Próximos três passos (feitos na v4, veja o README)

1. **Obstáculos livres**: desenhar retângulos/polígonos de obstáculos (chaminés, claraboias) em qualquer posição, substituindo a área central demonstrativa.
2. **Grade alinhada ao telhado**: escolher um lado de referência para girar a grade de módulos junto com a água do telhado (hoje a grade segue os eixos da tela).
3. **Offline de verdade (PWA)**: manifest + service worker para instalar no Android e abrir sem internet. Precisa ser servido por HTTPS (ex.: GitHub Pages), porque abrindo o arquivo direto o navegador não permite service worker.
