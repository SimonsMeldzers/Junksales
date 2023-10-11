export const schema = {
  types: [
    {
      name: 'item',
      title: 'Pieejamās preces',
      type: 'document',
      fields: [
      {
          name: 'image',
          title: 'Attēli',
          type: 'array',
          of: [{type: 'image'}],
          options: {
              layout: 'grid',
              hotspot: true,
          }
      },
      {
          name: 'name',
          title: 'Nosaukums',
          type: 'string',
      },
      {
          name: 'slug',
          title: 'Unikālais ID',
          type: 'slug',
          options: {
              source: 'name',
              maxLength: 90,
          }
      },
      {
        name:'type',
        title: 'Preces kategorija',
        type: 'string',
        initialValue: '',
        options:{
            list: [
                { title: 'Būvmateriāli', value: 'ConstructionMaterials'},
                { title: 'Auto detaļas', value: 'CarParts'},
                { title: 'Lauksaimniecība', value: 'FarmItems'},
                { title: 'Mājai', value: 'ForHome'},
                { title: 'Cits', value: 'Other'},
            ]
        }
      },
      {
        name:'state',
        title: 'Stāvoklis',
        type: 'string',
        initialValue: '',
        options:{
            list: [
                { title: 'Jauns', value: 'New'},
                { title: 'Lietots', value: 'Used'},
                { title: 'Stipri lietots', value: 'VeryUsed'},
            ]
        }
      },
      {
          name: 'price',
          title: 'Cena',
          type:'number',
      },
      {
          name: 'details',
          title: 'Apraksts',
          type: 'text',
      },
      {
          name:'address',
          title: 'Adrese',
          type: 'string',
      },
  ],
  },
  ],
}
