import {useForm} from "react-hook-form";

const Receipt = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Receipt</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Date</label>
            <div className="control">
              <input
                {...register("input_name")}
                name="receiptDate"
                className="input is-small"
                type="date"
              />
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Received From</label>
            <div className="control">
              <input
                {...register("input_name")}
                name="receivedFrom"
                className="input is-small"
                type="text"
              />
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Cheque Number</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="chequeNumber"
                    className="input is-small"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">chequeDated</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="dated"
                    className="input is-small"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">The Sum of</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="sumOf"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Being paid for</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="paidFor"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">For and on behalf of</label>
            <div className="control">
              <input
                {...register("input_name")}
                name="onBehalf"
                className="input is-small"
                type="text"
              />
            </div>
          </div>
          <div className="field mt-4">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Receipt;
