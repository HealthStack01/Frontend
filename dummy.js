const band = {
  tariff: {
    contracts: [
      {
        plans: [],
      },
    ],
  },
};

const bandServer = {patch: ""};

const selectedBand = {}; //get your selected band to update the plan
const selectedContract = {}; //get selected contract the band is in
const selectedPlan = {}; //get the plan you want to update

const handleUpdatePlan = data => {
  //Get your previous contracts from the band
  const prevContracts = selectedBand.tariff.contracts;

  //get your previous plans from the contract the plan you want to update is in
  const prevPlans = selectedContract.plans || [];

  //update the plan with your new data and parse previous data before new data
  const updatedPlan = {
    ...selectedPlan,
    ...data,
  };

  //put the updated plan in the previous plans array by mapping through
  const newPlans = prevPlans.map(item => {
    if (item._id === selectedPlan._id) {
      return updatedPlan;
    } else {
      return item;
    }
  });

  //put the new plans in the contract that you selected from start that has the plan you want to updated
  const updatedContract = {
    ...selectedContract,
    plans: newPlans,
  };

  //put the new contract that you updated into the list of contracts
  const newContracts = prevContracts.map(item => {
    if (item._id === updatedContract._id) {
      return updatedContract;
    } else {
      return item;
    }
  });

  //put the list of contracts into the tariff of the band that you selected to update the plan in the first place
  const newBand = {
    ...selectedBand,
    tariff: {
      serviceName: "",
      contracts: newContracts,
    },
  };

  //update the band
  bandServer.patch(selectedBand._id, newBand);
};
