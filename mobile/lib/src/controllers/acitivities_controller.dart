import 'dart:convert';

import 'package:mobile/src/models/activity_model.dart';
import 'package:mobile/src/services/http_client.dart';

abstract class IActivityController {
  Future<List<ActivityModel>> getActivities();
}

class ActivityController implements IActivityController {
  final IHttpClient client;

  ActivityController({required this.client});

  @override
  Future<List<ActivityModel>> getActivities() async {
    final response = await client.get(url: "http://localhost:3000/atividades");

    if (response.statusCode == 200) {
      final List<ActivityModel> activities = [];
      final body = jsonDecode(response.body);

      body['data'].map((item) {
        final ActivityModel activity = ActivityModel.fromJson(item);
        activities.add(activity);
      }).toList();

      return activities;
    } else {
      return [];
    }
  }
}
