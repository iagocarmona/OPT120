import 'dart:convert';

import 'package:mobile/src/models/user_model.dart';
import 'package:mobile/src/services/http_client.dart';

abstract class IUserController {
  Future<List<UserModel>> getUsers();
}

class UserController implements IUserController {
  final IHttpClient client;

  UserController({required this.client});

  @override
  Future<List<UserModel>> getUsers() async {
    final response = await client.get(url: "http://localhost:3000/usuarios");

    if (response.statusCode == 200) {
      final List<UserModel> users = [];
      final body = jsonDecode(response.body);

      body['data'].map((item) {
        final UserModel user = UserModel.fromJson(item);
        users.add(user);
      }).toList();

      return users;
    } else {
      return [];
    }
  }
}
