class ThreatCatalogTable {
  constructor(threat_catalog, ...rest) {
    this.choices = [];
    this.selected = [];

    if (threat_catalog && threat_catalog.length > 0) {
      for (const key in threat_catalog[0]) {
        if (!(rest.includes(key))) this.choices.push(key);
      }
    }

    this.selectAll();
  }

  log_choices() {
    console.log(this.choices);
  }

  set_selected(selected) {
    this.selected = [...selected];
  }

  is_selected(key) {
    if (this.isAllSelected()) return true;
    return this.selected.includes(key);
  }

  factory(choices, selected) {
    let threatCatalogTable = new ThreatCatalogTable([]);
    threatCatalogTable.choices = [...choices];
    threatCatalogTable.set_selected(selected);
    return threatCatalogTable;
  }

  selectAll() {
    this.selected = [...this.choices];
  }

  isAllSelected() {
    return this.selected.length === this.choices.length;
  }

}


const calculatePercentage = (val, total) => val*100/total;


export const calculatePercentageOfThreatCatalogByGiveField = (threat_catalog, field) => {
  
  if (threat_catalog && threat_catalog.length > 0) {

    let res = {
      fields: [],
      values: [],
    };

    let temp = {};
    const total = threat_catalog.length;

    for (let tc of threat_catalog) {
      if (!field.multiple) {
        if (!temp[tc[field.name]]) temp[tc[field.name]] = 0;
        temp[tc[field.name]] = temp[tc[field.name]] + 1;
      } else {
        for (let val of tc[field.name]) {
          if (!temp[val.name]) temp[val.name] = 0;
          temp[val.name] = temp[val.name] + 1;
        }
      }
      
    }

    for (let key in temp) {
      res.fields.push(key);
      field.inPercent ? 
        res.values.push(calculatePercentage(temp[key], total)):
        res.values.push(temp[key]);
    }

    

    return res;
  }

  // return rest.map(x => null);
  return null
}

export const years = () => {
  let today = new Date();
  let res = [];
  for (let i = 0; i <= 20; i++) {
    res.push(today.getFullYear() - i)
  }
  return res;
}

export const currentYear = () => {
  let today = new Date();
  return today.getFullYear()
}

export default ThreatCatalogTable;


