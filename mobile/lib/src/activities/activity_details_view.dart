import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:mobile/src/controllers/activity_controller.dart';
import 'package:mobile/src/models/activity_model.dart';
import 'package:mobile/src/services/http_client.dart';
import 'package:mobile/src/stores/activity_stores.dart';

class ActivityItemDetailsView extends StatefulWidget {
  final int id;

  const ActivityItemDetailsView({super.key, required this.id});

  @override
  State<ActivityItemDetailsView> createState() =>
      _ActivityItemDetailsViewState();
}

class _ActivityItemDetailsViewState extends State<ActivityItemDetailsView> {
  final ActivityStore store = ActivityStore(
    controller: ActivityController(
      client: HttpClient(),
    ),
  );

  ActivityModel? item;

  @override
  void initState() {
    super.initState();
    _loadActivity();
  }

  Future<void> _loadActivity() async {
    final activity = await store.getActivityById(widget.id);
    setState(() {
      item = activity;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalhe da atividade'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Center(
          child: Column(
            children: [
              _buildDetailItem(
                icon: Icons.title,
                text: item?.title ?? 'Título não disponível',
                fontSize: 24,
                color: Colors.blue,
              ),
              const SizedBox(height: 16),
              const Divider(
                color: Colors.grey,
                height: 1,
              ),
              _buildDetailItem(
                icon: Icons.description,
                text: item?.description ?? 'Descrição não disponível',
                fontSize: 20,
                color: Colors.green, // Cor verde para a descrição
              ),
              const SizedBox(height: 16),
              const Divider(color: Colors.grey),
              _buildDetailItem(
                icon: Icons.date_range,
                text: item?.date ?? 'Data não disponível',
                fontSize: 20,
                color: Colors.orange, // Cor laranja para a data
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDetailItem({
    required IconData icon,
    required String text,
    required double fontSize,
    required Color color,
  }) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Icon(
            icon,
            color: color,
            size: 28,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: fontSize,
                fontWeight: FontWeight.w300,
                color: Colors.white54,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
