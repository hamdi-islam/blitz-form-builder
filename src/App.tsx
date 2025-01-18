import Button from "@mui/material/Button";
import { FormBuilder, Template } from "react-form-builder";
import * as Yup from "yup";

function App() {
  const schema = Yup.object().shape({
    email: Yup.string().required("email is required").email("email is wrong"),
  });

  const template: Template = {
    config: [
      {
        type: "textfield",
        label: "Email address",
        name: "email",
        fieldProps(props) {
          const { watch } = props;
          const firstname = watch("firstname");
          console.log(firstname);
          if (firstname === "jack") {
            return { disabled: true };
          }
        },
      },
      {
        type: "textfield",
        label: "First Name",
        name: "firstname",
      },
      {
        type: "textfield",
        label: "Last Name",
        name: "lastname",
      },
      {
        type: "render",
        name: "render",
        RenderComponent: () => {
          return (
            <Button variant="contained" size="small" type="submit">
              Submit
            </Button>
          );
        },
      },
    ],
  };

  return (
    <>
      <FormBuilder
        validationSchema={schema}
        template={[template]}
        formProps={{
          defaultValues: {
            email: "example@example.com",
          },
        }}
        onSubmit={(data) => console.log(data)}
      />
    </>
  );
}

export default App;
