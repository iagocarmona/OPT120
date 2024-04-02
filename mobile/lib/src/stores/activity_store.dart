import 'package:flutter/material.dart';
import 'package:mobile/src/controllers/acitivities_controller.dart';
import 'package:mobile/src/models/activity_model.dart';

class ActivityStore {
  final IActivityController controller;

  final ValueNotifier<bool> isLoading = ValueNotifier<bool>(false);

  final ValueNotifier<List<ActivityModel>> state =
      ValueNotifier<List<ActivityModel>>([]);

  final ValueNotifier<String> error = ValueNotifier<String>("");

  ActivityStore({required this.controller});

  getActivities() async {
    isLoading.value = true;

    final result = await controller.getActivities();
    state.value = result;
  }
}
