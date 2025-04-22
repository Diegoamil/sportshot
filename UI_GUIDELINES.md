# Diretrizes de UI – Padrão para o Projeto

## 1. Princípios Gerais
- Interfaces devem ser **bonitas, modernas e profissionais**.
- Evite designs "cookie cutter" (genéricos). Busque sempre um visual diferenciado.
- Utilize **React com JSX**, **Tailwind CSS** para estilização, e **Lucide React** para ícones.
- Use imagens de stock do **Pexels** (via URLs) onde apropriado.
- Não instale novos pacotes de UI ou ícones sem necessidade ou solicitação.

## 2. Paleta de Cores
- Utilize uma paleta de cores consistente, preferencialmente tons modernos e neutros, com destaques vibrantes para ações importantes.
- Defina as cores principais em `tailwind.config.js` para fácil manutenção.
- Exemplo:
  - Primária: `#FF4602` (laranja vibrante)
  - Secundária: `#fbbf24` (amarelo)
  - Fundo: `#f9fafb` (cinza claro)
  - Texto: `#111827` (cinza escuro)

## 3. Tipografia
- Use a fonte **Poppins** como fonte principal em todo o projeto.
- Tamanhos de fonte responsivos (usando classes Tailwind: `text-base`, `text-lg`, etc).
- Hierarquia clara entre títulos, subtítulos e corpo do texto.
- Pesos da fonte: Light (300) para textos secundários, Regular (400) para textos normais, Medium (500) para ênfase, Semibold (600) para subtítulos, Bold (700) para títulos.

## 4. Espaçamento e Layout
- Utilize espaçamentos generosos (`p-4`, `m-2`, `gap-4`) para evitar poluição visual.
- Use grids e flexbox do Tailwind para layout responsivo.
- Componentes devem ser "card-based" quando possível para melhor organização.

## 5. Botões
- Botões principais: cor de destaque, texto claro, bordas arredondadas (`rounded-lg`).
- Botões secundários: cor neutra, borda visível (`border`), hover com leve destaque.
- Ícones Lucide podem ser usados em botões para reforçar ação.
- Exemplo de classe: `bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition`

## 6. Inputs e Formulários
- Inputs com bordas arredondadas, preenchimento confortável (`p-2`, `rounded-md`).
- Destaque de foco (`focus:ring-2 focus:ring-blue-500`).
- Labels sempre visíveis e legíveis.

## 7. Ícones
- Use apenas ícones do **Lucide React**.
- Ícones devem ser usados para reforçar ações, navegação e feedback visual.
- Tamanho proporcional ao texto (`w-5 h-5` para ícones em botões, por exemplo).

## 8. Imagens
- Utilize imagens do **Pexels** diretamente por URL.
- Imagens devem ser responsivas (`object-cover`, `rounded-lg` para avatares e cards).

## 9. Responsividade
- Todo componente/página deve ser mobile-first e responsivo.
- Use breakpoints do Tailwind (`sm:`, `md:`, `lg:`) para adaptar layouts.

## 10. Acessibilidade
- Sempre utilize atributos `alt` em imagens.
- Garanta contraste suficiente entre texto e fundo.
- Utilize `aria-label` e roles quando necessário.
- Navegação por teclado deve funcionar em todos os componentes interativos.

## 11. Boas Práticas
- Componentes reutilizáveis e bem nomeados.
- Separação clara entre lógica (hooks) e apresentação (componentes).
- Comentários sucintos onde necessário.

---

> **Observação:** Este guia deve ser revisado e expandido conforme o projeto evolui. Sugestões e melhorias são bem-vindas.
