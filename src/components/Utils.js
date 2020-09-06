const CAMPAIGN_CATEGORY = {
  PAST: 0,
  LIVE: 1,
  UPCOMING: 2
};
export const getCampaignList = (compaignCategory, data) => {
  let currentDate = Date.now();
  let currentDateObj = new Date(currentDate);
  console.log(currentDateObj);
  let updatedData = [];
  switch (compaignCategory) {
    case CAMPAIGN_CATEGORY.LIVE:
      updatedData = data.filter((element) => {
        let eventDate = new Date(element.createdOn);
        return (
          eventDate.toLocaleDateString() === currentDateObj.toLocaleDateString()
        );
      });
      break;
    case CAMPAIGN_CATEGORY.PAST:
      updatedData = data.filter((element) => {
        let eventDate = new Date(element.createdOn);
        return eventDate.toLocaleDateString() !== currentDateObj.toLocaleDateString() && eventDate < currentDateObj;
      });
      break;
    case CAMPAIGN_CATEGORY.UPCOMING:
      updatedData = data.filter((element) => {
        let eventDate = new Date(element.createdOn);
        return eventDate.toLocaleDateString() !== currentDateObj.toLocaleDateString() && eventDate > currentDateObj;
      });
      break;
    //no default
  }
  return updatedData;
};
