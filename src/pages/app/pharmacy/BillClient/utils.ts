import { Dictionary } from '../../../../types.d';

export const getSellingPrice = (contracts, billMode) => {
  let sellingPrice = 0;
  let errorMessage = '';
  if (billMode.type === 'HMO Cover') {
    let contract = contracts.filter(
      (el) => el.source_org === billMode.detail.organizationId,
    );
    if (contract.length) {
      sellingPrice = contract[0].price;
    } else {
      sellingPrice = 0;
      errorMessage =
        'Please HMO does not have cover/price for this service. Either set service price for HMO , try another drug, bill using cash or adjust amount ';
    }
  }
  if (billMode.type === 'Company Cover') {
    let contract = contracts.filter(
      (el) => el.source_org === billMode.detail.organizationId,
    );
    if (contract.length) {
      sellingPrice = contract[0].price;
    } else {
      sellingPrice = 0;
      errorMessage =
        'Please company does not have cover/price for this service. Either set service price for Company or try another drug or bill using cash';
    }
  }
  if (billMode.type === 'Cash' || billMode.type === 'Family Cover') {
    let contract = contracts.filter((el) => el.source_org === el.dest_org);
    if (contract.length) {
      sellingPrice = contract[0].price;
    } else {
      errorMessage =
        'Please there is no cover/price for this service. Either set service price or try another service. Setting price at zero ';
      sellingPrice = 0;
    }
  }
  return { sellingPrice, errorMessage };
};

const createPaymentMode = (pay, name, cover, type) => {
  let details: Dictionary = {};
  details = { ...pay };
  details.type = type;

  return {
    name,
    value: cover,
    detail: details,
    type,
  };
};

export const getBillingInfo = (clientPaymentInfo) => {
  const paymentOptions = [];
  let paymentOption;
  let paymentOptionName;
  const activePayment = clientPaymentInfo.find((obj) => obj.active);

  if (activePayment) {
    switch (activePayment.paymentmode) {
      case 'Cash':
        paymentOption = createPaymentMode(
          activePayment,
          'Cash',
          'Cash',
          'Cash',
        );
        paymentOptionName === 'Cash';
        break;
      case 'Family':
        paymentOption = createPaymentMode(
          activePayment,
          'Family Cover',
          'familyCover',
          'Family Cover',
        );
        paymentOptionName = 'Family Cover';

        break;
      case 'Company':
        paymentOptionName =
          'Company: ' +
          activePayment.organizationName +
          '(' +
          activePayment.plan +
          ')';

        paymentOption = createPaymentMode(
          activePayment,
          paymentOptionName,
          'CompanyCover',
          'Company Cover',
        );
        break;
      case 'HMO':
        paymentOptionName =
          'HMO: ' +
          activePayment.organizationName +
          '(' +
          activePayment.plan +
          ')';
        paymentOption = createPaymentMode(
          activePayment,
          paymentOptionName,
          'HMOCover',
          'HMO Cover',
        );
        break;
      default:
    }

    paymentOptions.push(paymentOption);

    return { paymentOptions, paymentOption, paymentOptionName };
  }
};
