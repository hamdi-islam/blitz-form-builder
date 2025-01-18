# blitz-form-builder

`blitz-form-builder` is a React package built on top of [Material-UI](https://mui.com/) and [react-hook-form](https://react-hook-form.com/). It simplifies the process of creating **single & multi step forms**, making it up to 20 times faster to build and manage complex forms in your React applications.

## Features

- **Easy-to-use API**: A declarative syntax to define forms and fields.
- **Material-UI Integration**: Leverages Material-UI components for a seamless and consistent design.
- **React Hook Form**: Provides robust form validation and state management out of the box.
- **Customizable**: Easily extend and override default behaviors to meet specific requirements.
- **Performance Optimized**: Minimal re-renders and high efficiency thanks to react-hook-form's architecture.

## Installation

Install the package via npm or yarn:

```bash
npm install blitz-form-builder
# or
yarn add blitz-form-builder
```

You also need to install the peer dependencies:

```bash
npm install @mui/material react-hook-form
# or
yarn add @mui/material react-hook-form
```

## Quick Start

Here’s a basic example to get started:

```jsx
import { FormBuilder, Template } from "react-form-builder";

function App() {
  const template: Template = {
    config: [
      {
        type: "textfield",
        label: "Email address",
        name: "email",
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
    ],
  };

  return (
    <>
      <FormBuilder
        onSubmit={(data) => console.log(data)}
        template={[template]}
      />
    </>
  );
}

export default App;
```

## Configuration Options

The `config` object allows you to define the form structure and behavior:

- `fields`: An array of field definitions, currently blitz-form-builder supports ("`textfield`"
  "`date`",
  "`select`",
  "`radio`",
  "`checkbox`",
  "`autocomplete`",
  "`rating`",
  "`switch`",
  "`render`"). Each field supports the following properties:

  - `name`: (string) Unique identifier for the field.
  - `label`: (string) Label displayed alongside the field.
  - `type`: (string) Field type (e.g., 'textfield', 'date', 'select', etc.).
  - `formControlProps?`: Provides context such as filled/focused/error/required for form inputs. Relying on the context provides high flexibility and ensures that the state always stays consistent across the children of the FormControl.
  - `formLabelProps?`: Provides context for the field label;
  - `fieldProps?`: field customization

## Field Customization

To customize your field use the `fieldProps` option to access its attributes

```jsx
{
    type: "textfield",
    label: "Email address",
    name: "email",
    fieldProps() {
        return { size: "medium", fullWidth: true, variant: "outlined" };
    },
},

```

To handle your fields based on your form's state you can access your state like follows

```jsx
{
    type: "textfield",
    label: "Email address",
    name: "email",
    fieldProps(props) {
    const { watch } = props;
    const firstname = watch("firstname");
      if (firstname === "jack") {
        return { disabled: true };
      }
    }
}
```

## Form builder props

`blitz-form-builder` extends the `html` form attributes in addition to those important ones:

- **`schema validation`**: We also support schema-based form validation with `Yup`, `Zod` , `Superstruct` & `Joi`, where you can pass your schema to useForm as an optional config. It will validate your input data against the schema and return with either errors or a valid result.

```jsx
const LoginSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email("email is wrong"),
  });

  ...
  ...

  <FormBuilder
    validationSchema={LoginSchema}
    ...
    ...
    />
```

- **`form control`**: Control form validation mode and other necessary behaviours using `formProps` which contains these props:

`mode`: Validation strategy before submitting behaviour.

`reValidateMode`: Validation strategy after submitting behaviour.

`defaultValues`: Default values for the form.

`values`: Reactive values to update the form values.

`errors`: Reactive errors to update the form errors.

`resetOptions`: Option to reset form state update while updating new form values.

`criteriaMode`: Display all validation errors or one at a time.

`shouldFocusError`: Enable or disable built-in focus management.

`delayError`: Delay error from appearing instantly.

`shouldUseNativeValidation`: Use browser built-in form constraint API.

`shouldUnregister`: Enable and disable input unregister after unmount.

```jsx
 <FormBuilder
    formProps={{
        defaultValues: {
            email: "example@example.com",
        },
        mode: "onBlur",
    }}
```

- **`form provider`**: provides React Context to your form using the `formProvider` prop
- **`stepper props`**: if your form is a multi stepper, you can use the `stepperProps` to customize it and provide titles for each step, e.g.

```jsx
<FormBuilder
    template={[template]}
    stepperProps={{
        titles: ["Genaral information", "Documents upload"],
    }}
    />
</>
```

- **`form submition`**: the formBuilder offers a onSubmit prop to submit your component

```jsx
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
        name: 'render',
        RenderComponent: () => {
          return <Button type="submit">Submit</Button>
        }
      }
    ],
  };

  return (
    <>
      <FormBuilder
        template={[template]}
        formProps={{
          defaultValues: {
            radio: 2,
            email: "example@example.com",
            select: "1",
          },
          mode: "onBlur",
        }}
        onSubmit={(data) =>
            console.log(data)
            // make your api call
        }
      />
    </>
  );
}
```

## Contributing

We welcome contributions! If you have suggestions or encounter issues, please open an [issue](https://github.com/your-repo/blitz-form-builder/issues) or submit a pull request.

## License

`blitz-form-builder` is licensed under the MIT License.

---

Happy form building! 🚀
