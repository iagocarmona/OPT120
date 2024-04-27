import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:localstorage/localstorage.dart';

abstract class IHttpClient {
  Future get({required String url, int? id});
  Future post({required String url, required dynamic body});
  Future put({required String url, required dynamic body});
  Future delete({required String url, required int id});
}

class HttpClient implements IHttpClient {
  final client = http.Client();
  final token = localStorage.getItem('token');

  @override
  Future get({required String url, int? id}) async {
    String newUrl = url;

    if (id != null) {
      newUrl = '$url/$id';
    }

    return await client.get(
      Uri.parse(newUrl),
      headers: {
        'x-auth-token': token ?? "",
      },
    );
  }

  @override
  Future post({required String url, required dynamic body}) async {
    return await client.post(
      Uri.parse(url),
      body: jsonEncode(body),
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'x-auth-token': token ?? ""
      },
    );
  }

  @override
  Future put({required String url, required dynamic body}) async {
    return await client.put(
      Uri.parse(url),
      body: jsonEncode(body),
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        'x-auth-token': token ?? ""
      },
    );
  }

  @override
  Future delete({required String url, required int id}) async {
    final newUrl = '$url/$id';
    return await client.delete(
      Uri.parse(newUrl),
      headers: {
        'x-auth-token': token ?? "",
      },
    );
  }
}
