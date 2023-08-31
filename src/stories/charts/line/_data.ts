export type Data = {
  id: string;
  data: {
    x: string;
    y: number;
    custom_data?: string;
  }[];
};

export const data: Data = {
  id: "Sentiment",
  data: [
    {
      "x": "Homepage",
      "y": 2,
      "custom_data": "cazzate"
    },
    {
      "x": "Catalogo",
      "y": 4
    },
    {
      "x": "Scheda Prodotto",
      "y": 3
    },
    {
      "x": "Check Out",
      "y": 3
    },
    {
      "x": "Conferma Ordine",
      "y": 1
    },
    {
      "x": "Carrello",
      "y": 5,
      "custom_data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis tincidunt ultricies, nunc nisl lacinia nunc, quis lacinia nisl nun"
    },
  ]
};