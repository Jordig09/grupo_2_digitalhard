const getSpecification = (req, res, next) =>  {
    const specification = [];
    let reqSpecification = [];
    if(Object.keys(req.body).includes('specification-title')){
      if (!Array.isArray(req.body[`specification-title`])){
        reqSpecification = req.body[`specification-title`] ? [req.body[`specification-title`]] : [""]
      }else{
        reqSpecification = req.body[`specification-title`];
      }
    }
    // let reqSpecification = req.body[`specification-title`] || [];
    // if (!Array.isArray(reqSpecification)) reqSpecification = [reqSpecification];
    reqSpecification.forEach((data, i) => {
      specification.push({
        title: data,
        detail: [],
      });
      let names = [];
      let texts = [];
      if(Object.keys(req.body).includes(`specification-name-${i}`)){
        if (!Array.isArray(req.body[`specification-name-${i}`])){
          names = req.body[`specification-name-${i}`] ? [req.body[`specification-name-${i}`]] : [""]
        }else{
          names = req.body[`specification-name-${i}`];
        }
      }
      if(Object.keys(req.body).includes(`specification-text-${i}`)){
        if (!Array.isArray(req.body[`specification-text-${i}`])){
          texts = req.body[`specification-text-${i}`] ? [req.body[`specification-text-${i}`]] : [""]
        }else{
          texts = req.body[`specification-text-${i}`];
        }
      }
      // let names = req.body[`specification-name-${i}`] || [];
      // let texts = req.body[`specification-text-${i}`] || [];
      // if (!Array.isArray(names)) names = [names];
      // if (!Array.isArray(texts)) texts = [texts];
      for (let j = 0; j < names.length; j++) {
        specification[i].detail.push({
          name: names[j],
          text: texts[j],
        });
      }
    }, 0);
  
    let toDelete = req.body.deleteSpecifications || [];
    if (toDelete && !Array.isArray(toDelete)) toDelete = [toDelete];
  
    const toUpdate = [];
    if (req.body.idUpdate) {
      let idsToUpdate = req.body.idUpdate;
      if (!Array.isArray(idsToUpdate)) idsToUpdate = [idsToUpdate];
      idsToUpdate.forEach((data) => {
        if (!toDelete.includes(data)) {
          let newName = req.body[`nameUpdate-${data}`];
          let newText = req.body[`textUpdate-${data}`];
          toUpdate.push({
            id: data,
            name: newName,
            text: newText,
          });
        }
      });
    }
    
    req.body.specification = specification;
    req.body.toDelete = toDelete;
    req.body.toUpdate = toUpdate;

    next();
  }

  module.exports = { getSpecification };