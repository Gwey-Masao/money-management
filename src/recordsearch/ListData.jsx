const ListData = (() => {
    let recordData = [];
    const getRecordData = () => {
      return recordData;
    };
    const setRecordData = (data) => {
      recordData = data;
    };
    return {
      getRecordData: getRecordData,
      setRecordData: setRecordData
    }
  })();
  
  
  export default ListData;