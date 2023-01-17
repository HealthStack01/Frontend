import {Box} from "@mui/material";
import Input from "../../../../components/inputs/basic/Input";
import PasswordInput from "../../../../components/inputs/basic/Password";

const AdminForm = ({register, errors}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      gap={1}
    >
      <Input
        label="First Name"
        register={register("firstname")}
        errorText={errors?.firstname?.message}
      />
      <Input
        label="Last Name"
        register={register("lastname")}
        errorText={errors?.lastname?.message}
      />
      <Input
        label="Email Address"
        register={register("email")}
        errorText={errors?.email?.message}
      />
      <Input
        label="Phone Number"
        register={register("phone")}
        errorText={errors?.phone?.message}
      />
      <Input
        label="Profession"
        register={register("profession")}
        errorText={errors?.profession?.message}
      />
      <Input
        label="Position"
        register={register("position")}
        errorText={errors?.position?.message}
      />
      <Input
        label="Department"
        register={register("department")}
        errorText={errors?.department?.message}
      />
      <Input
        label="Department Unit"
        register={register("deptunit")}
        errorText={errors?.deptunit?.message}
      />
      <PasswordInput
        label="Password"
        autoComplete="new-password"
        register={register("password")}
        errors={errors?.password?.message}
      />
    </Box>
  );
};

export default AdminForm;
