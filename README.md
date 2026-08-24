# Validade do Produto

Aplicação web simples para calcular a data de validade de um produto a partir de uma data base e de um período informado pelo usuário.

A interface foi criada em português do Brasil, com foco em uma experiência objetiva, responsiva e acessível em computadores e celulares.

## Funcionalidades

- Usa a data atual automaticamente como data base ao abrir a página.
- Permite alternar entre a data de hoje e uma data escolhida manualmente.
- Calcula períodos em `Dias`, `Meses` ou `Anos`.
- Atualiza o resultado automaticamente enquanto os campos são preenchidos ou alterados.
- Exibe a data calculada no formato `21 Agosto de 2026`.
- Impede resultados para valores vazios, negativos ou inválidos.
- Preserva o fim do mês em cálculos com meses e anos. Por exemplo, uma data no dia 31 pode resultar no último dia do mês de destino quando esse mês não possui 31 dias.
- Possui um modal informativo sobre a diferença entre dias corridos e meses do calendário.
- Permite fechar o modal pelo botão de fechar, clicando fora dele ou pressionando `Esc`.
- Mantém o layout adaptado para telas menores, com rolagem interna no conteúdo do modal quando necessário.

## Como funciona

### Data base

Por padrão, o botão de confirmação ao lado do campo indica que a data de hoje está sendo usada. Nesse estado, o campo de data fica bloqueado.

Ao clicar no botão, a página permite informar uma data manualmente. O texto auxiliar abaixo do campo também indica qual modo está ativo.

### Período de validade

O usuário informa um número inteiro e escolhe uma unidade:

- **Dias:** adiciona uma quantidade exata de dias corridos.
- **Meses:** adiciona meses do calendário e ajusta datas que não existem no mês de destino.
- **Anos:** adiciona anos do calendário e preserva o mês e o limite válido de dias.

O ícone `!` ao lado da label abre uma explicação com o exemplo de que 90 dias não são necessariamente iguais a 3 meses. Isso ocorre porque os meses possuem diferentes quantidades de dias.

### Resultado

O resultado aparece automaticamente no painel `DATA DE VALIDADE`. Enquanto a data base ou o período não forem válidos, o painel exibe `—`.

## Funcionamento

- A página inicia usando a data atual como data base.
- O botão de check fica selecionado por padrão e bloqueia o campo de data.
- Ao clicar no check, o campo de data é liberado para informar uma data manualmente.
- O cálculo acontece automaticamente ao preencher ou alterar o período.
- A unidade pode ser `Dias`, `Meses` ou `Anos`.
- O resultado é apresentado no formato `21 Agosto de 2026`.
- O cálculo de meses e anos preserva o fim do mês quando necessário, evitando datas inválidas como 31/02.
