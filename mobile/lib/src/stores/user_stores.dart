import 'package:flutter/material.dart';
import 'package:mobile/src/controllers/users_controller.dart';
import 'package:mobile/src/models/user_model.dart';

class UserStore {
  final IUserController controller;

  final ValueNotifier<bool> isLoading = ValueNotifier<bool>(false);

  final ValueNotifier<List<UserModel>> state =
      ValueNotifier<List<UserModel>>([]);

  final ValueNotifier<String> error = ValueNotifier<String>("");

  UserStore({required this.controller});

  getUsers() async {
    isLoading.value = true;

    final result = await controller.getUsers();
    state.value = result;
  }
}
