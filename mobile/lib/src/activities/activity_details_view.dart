import 'package:flutter/material.dart';

class ActivityItemDetailsView extends StatelessWidget {
  const ActivityItemDetailsView({super.key});

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
