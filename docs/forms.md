---
sidebar_label: "Forms"
sidebar_position: 4
---

# Forms

After finishing setting up flutter and stacked (if you didn't setup stacked check out [get-started](get-started.md)), one of the features stacked provides is form handling by connecting form data in view and view model so that business logic and UI are separate and consistent with our goal. 

## Form Setup

Before generating methods for handling the controllers and validation messages. You need to tell the generator what your form has. And to tell the generator we use [annotations](https://medium.com/swlh/dart-annotations-a-simple-intro-to-reflection-c654275cc967). 

Go into the view file and At the top of your class add

```dart
@FormView(fields: [])
```

`fields` accepts Lists of `FormField` which can be:

- **FormTextField** 
- **FormDateField** 
- **FormDropdownField** 

Each of the items above accepts name which is required to generate an appropriate controllers and keys 

As an example let's assume you have a folder named `sign_in` which has `sign_in_view.dart` and `sign_in_viewmodel.dart` on your sign_in_view it has two textfields username and password your annotaion will look like

```dart
@FormView(fields: [
    FormTextField(name: 'username'),
    FormTextField(name: 'password'),
])
```

## Form Generating

After adding the annotation go on your terminal and run 

```shell
flutter pub run build_runner build --delete-conflicting-outputs
```


The command will generate a `sign_in_view.form.dart` which has a mixin `$SignInView` holding TextEditingControllers, FocusNodes and extensions to set validation messages 

in the previous example it will generate

TextEditingControllers:
- **usernameController** 
- **passwordController** 
  
FocusNodes:
- **usernameFocusNode** 
- **passwordFocusNode** 

but your other two files won't know about it. so you have to connect them. 

## Connecting Generated File with View and Viewmodel

On your view import the newly generated file `sign_in_view.form.dart` and extend the mixin generated.  

continuing from the example above it will be like

```dart
import 'sign_in_view.form.dart';
...
class SignInView extends StatlessWidget with $SignInView{
```

to listen to text editing controller's change you must call listenToFormUpdated after your model is ready;

```dart
import 'sign_in_view.form.dart';
...
onModelReady: (viewmodel)=>listenToFormUpdated(viewmodel)
...
```

and on your viewmodel import the generated file and change BaseViewModel or AnyViewModel to FormViewModel to access the values of the controllers and set data's from the view model.

continuing from the example above it will be like

```dart
import 'sign_in_view.form.dart';
...
class SignInViewModel extends FormViewModel {
```

## Form Validation

To use form validation on your TextEditingControllers you can supply your own custom unit testable validator inside `FormTextField`

```dart

String? passwordValidator(String? value){
    if(value==null||value.isEmpty) return 'Password is Required';
    if(value.length<6) return 'Password Must be greater than 6 characters';
}

@FormView(fields: [
    FormTextField(name: 'username'),
    FormTextField(name: 'password',
        validator: passwordValidator,
    ),
])
```
don't forget to run `flutter pub run build_runner build --delete-conflicting-outputs` to update the generated file.

Underneath the validator you supplied will be called on every action on the text field and assign the String you supplied to the validation message if the conditions are not met.

To access the validation message you can use `viewModel.passwordValidationMessage` since validationMessage is generated for every controller and a boolean to check if the variable is empty or not.

```dart
if (viewModel.hasPasswordValidationMessage)
Text(viewModel.passwordValidationMessage!),
```


