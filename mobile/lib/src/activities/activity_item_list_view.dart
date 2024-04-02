import 'package:flutter/material.dart';
import 'package:mobile/src/controllers/acitivities_controller.dart';
import 'package:mobile/src/services/http_client.dart';
import 'package:mobile/src/stores/activity_store.dart';

import 'activity_item.dart';

class ActivityItemListView extends StatefulWidget {
  const ActivityItemListView({
    super.key,
  });

  static const routeName = '/';

  @override
  State<ActivityItemListView> createState() => _ActivityItemListViewState();
}

class _ActivityItemListViewState extends State<ActivityItemListView> {
  final ActivityStore store = ActivityStore(
    controller: ActivityController(
      client: HttpClient(),
    ),
  );

  var isLoaded = false;

  @override
  void initState() {
    super.initState();

    store.getActivities();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Atividades'),
      ),
      body: AnimatedBuilder(
        animation:
            Listenable.merge([store.isLoading, store.error, store.state]),
        builder: (context, child) {
          if (store.isLoading.value) {
            return const CircularProgressIndicator();
          }

          return ListView.separated(
            itemBuilder: (_, index) {
              final item = store.state.value[index];

              return Column(
                children: [
                  Text(item.title,
                      maxLines: 1, overflow: TextOverflow.ellipsis),
                  Text(item.description,
                      maxLines: 2, overflow: TextOverflow.ellipsis),
                ],
              );
            },
            separatorBuilder: (context, index) => const SizedBox(height: 32),
            itemCount: store.state.value.length,
            padding: const EdgeInsets.all(16),
          );
        },
      ),
    );
  }
}
