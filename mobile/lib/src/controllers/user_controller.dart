import 'dart:convert';

import 'package:mobile/src/models/user_model.dart';
import 'package:mobile/src/services/http_client.dart';

abstract class IUserController {
  Future<List<UserModel>> getUsers();
  Future<void> createUser(UserModel user);
  Future<String> login(UserModel user);
  Future<void> updateUser(UserModel user);
  Future<void> deleteUser(int id);
}

class UserController implements IUserController {
  final IHttpClient client;
  final baseUrl = "http://localhost:3000/usuarios";

  UserController({required this.client});

  @override
  Future<List<UserModel>> getUsers() async {
    final response = await client.get(url: baseUrl);

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

  @override
  Future<void> createUser(UserModel user) async {
    final Map<String, dynamic> data = user.toJson();

    final response = await client.post(url: baseUrl, body: data);

    if (response.statusCode != 201) {
      throw Exception('Failed to create user');
    }
  }

  @override
  Future<String> login(UserModel user) async {
    final Map<String, dynamic> data = user.toJson();
    final loginUrl = '$baseUrl/login';

    final response = await client.post(url: loginUrl, body: data);

    if (response.statusCode == 201) {
      final responseData = jsonDecode(response.body);

      final token = responseData['data'];

      return token;
    } else {
      throw Exception('Failed login: ${response.statusCode}');
    }
  }

  @override
  Future<void> updateUser(UserModel user) async {
    final Map<String, dynamic> data = user.toJson();

    final response = await client.put(url: baseUrl, body: jsonEncode(data));

    if (response.statusCode != 200) {
      throw Exception('Failed to update user');
    }
  }

  @override
  Future<void> deleteUser(int id) async {
    final response = await client.delete(url: baseUrl, id: id);

    if (response.statusCode != 200) {
      throw Exception('Failed to delete user');
    }
  }
}
