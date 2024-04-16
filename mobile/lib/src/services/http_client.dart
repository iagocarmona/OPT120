import 'package:http/http.dart' as http;

abstract class IHttpClient {
  Future get({required String url});
  Future post({required String url, required dynamic body});
  Future put({required String url, required dynamic body});
  Future delete({required String url, required int id});
}

class HttpClient implements IHttpClient {
  final client = http.Client();

  @override
  Future get({required String url}) async {
    return await client.get(Uri.parse(url));
  }

  @override
  Future post({required String url, required dynamic body}) async {
    return await client.post(
      Uri.parse(url),
      body: body,
    );
  }

  @override
  Future put({required String url, required dynamic body}) async {
    return await client.post(
      Uri.parse(url),
      body: body,
    );
  }

  @override
  Future delete({required String url, required int id}) async {
    final newUrl = '$url/$id';
    return await client.delete(Uri.parse(newUrl));
  }
}
