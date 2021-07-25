const ListData = (() => {
  let recordData = [];
  const getRecordData = () => {
    return recordData;
  };
  const setRecordData = (getdata) => {
    recordData = getdata;
  };
  return {
    getRecordData: getRecordData,
    setRecordData: setRecordData
  }
})();

export default ListData;