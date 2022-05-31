---
id: forms
title: "Forms"
sidebar_position: 3
---

# Forms

After finishing setting up flutter and stacked (if you didn't setup stacked, check out [get-started](get-started.md)), one of the features stacked provides is form handling. We automatically sync the values from the controller with the ViewModel, reducing the amount of boilerplate required to manage forms.
 

## Form Setup

To make use of the form functionality, we use the `@FormView` annotaton on the View that contains the form. It will tell the generator what to include when generating. Go into the file containing the form and At the top of your class, add

```dart
@FormView(fields: [])
```

`fields` accepts a list of `FormField` types, and `FormTextField` is one of the types for `FormField`.

A **FormTextField** requires a name. A controllers and FocusNodes will be created using this name. Let's assume you have a folder named `sign_in` which has `sign_in_view.dart` and `sign_in_viewmodel.dart`. In your `sign_in_view` file, it has two textfields, username and password. Your annotation will look like this:

```dart
@FormView(fields: [
    FormTextField(name: 'username'),
    FormTextField(name: 'password'),
])
class SignInView extends StatlessWidget{
    ...
```

## Form Generating

After adding the annotation, go to your terminal and run 

```shell
flutter pub run build_runner build --delete-conflicting-outputs
```


The command will generate a `sign_in_view.form.dart` which has a mixin holding TextEditingControllers, FocusNodes, and extensions to set validation messages. 

**In the previous example it will generate**

* TextEditingControllers:
  * usernameController
  * passwordController 
  
* FocusNodes:
  * usernameFocusNode 
  * passwordFocusNode 


## Connecting Generated File with View and Viewmodel

In your view, import the newly generated file `sign_in_view.form.dart`, and extend the mixin generated.  


```dart
import 'sign_in_view.form.dart';
...
class SignInView extends StatlessWidget with $SignInView{
```

To automatically sync the controllers with the ViewModels, you must call listenToFormUpdated in onModelReady and pass it the model.

```dart
...
@override
  Widget build(BuildContext context) {
    return ViewModelBuilder<SignInViewModel>.reactive(
      onModelReady: (viewModel) {
        listenToFormUpdated(viewModel);
      },
      builder: (context, viewModel, child) {
          ...
      }
```

 The `listenToFormUpdated` function expects a `FormViewModel` so you can open the ViewModel for your file and extend from a `FormViewModel`

```dart
...
class SignInViewModel extends FormViewModel {
    ...
}
```

## Form Validation

To use form validation on your TextEditingControllers you can supply your own custom unit testable validator inside `FormTextField`. The validator property on `FormTextField` expects a method that takes a String and returns a nullable String.

```dart

String? passwordValidator(String value) {
     if(value.isEmpty) {
         return 'Password is Required';
     }
     if(value.length < 6) {
         return 'Password Must be greater than 6 characters';
     }
     return null;
}

@FormView(fields: [
    FormTextField(name: 'username'),
    FormTextField(name: 'password',
        validator: passwordValidator,
    ),
])
```
Don't forget to run `flutter pub run build_runner build --delete-conflicting-outputs` to update the generated file.

The validator is executed for every character and the value returned is stored in [field_name]ValidationMessage. In addition to that, there's also a boolean value called has[field_name]ValidationMessage that indicates if a validation message is present.

The common way to conditionally show a validation message is to make use of the boolean mentioned above and the validation message value. See an example below.

```dart
if (viewModel.hasPasswordValidationMessage)
Text(viewModel.passwordValidationMessage!),
```


