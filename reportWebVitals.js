import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';





const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
   
      getCLS.then(getCLS(onPerfEntry));
      getFID.then(getFID(onPerfEntry));
      getFCP.then(getFCP(onPerfEntry));
      getLCP.then(getLCP(onPerfEntry));
      getTTFB.then(getTTFB(onPerfEntry));
    
  }
};

export default reportWebVitals;
