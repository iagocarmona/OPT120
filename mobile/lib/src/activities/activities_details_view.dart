import 'package:flutter/material.dart';

/// Displays detailed information about a SampleItem.
class ActivityItemDetailsView extends StatelessWidget {
  const ActivityItemDetailsView({super.key});

  static const routeName = '/activity_item';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalhe da atividade'),
      ),
      body: const Center(
        child: Text('More Information Here'),
      ),
    );
  }
}
