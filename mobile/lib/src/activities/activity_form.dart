import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/src/controllers/activity_controller.dart';
import 'package:mobile/src/models/activity_model.dart';
import 'package:mobile/src/services/http_client.dart';
import 'package:mobile/src/stores/activity_stores.dart';
import 'package:mobile/src/widgets/text_field.dart';

class ActivityForm extends StatefulWidget {
  const ActivityForm({super.key});

  @override
  State<ActivityForm> createState() => _ActivityFormState();
}

class _ActivityFormState extends State<ActivityForm> {
  final ActivityStore store = ActivityStore(
    controller: ActivityController(
      client: HttpClient(),
    ),
  );

  late TextEditingController titleController;
  late TextEditingController descriptionController;
  late TextEditingController dateController;
  late DateTime selectedDate;

  @override
  void initState() {
    titleController = TextEditingController();
    descriptionController = TextEditingController();
    dateController = TextEditingController();
    selectedDate = DateTime.now();

    super.initState();
  }

  @override
  void dispose() {
    titleController.dispose();
    descriptionController.dispose();
    dateController.dispose();

    super.dispose();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (pickedDate != null && pickedDate != selectedDate) {
      setState(() {
        selectedDate = pickedDate;
        dateController.text = DateFormat('dd/MM/yyyy').format(selectedDate);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Voltar'),
      ),
      body: Center(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(32.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  "Criar nova atividade",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 35,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 32),
                CustomTextField(
                  controller: titleController,
                  icon: Icons.title,
                  hint: "Título",
                ),
                const SizedBox(height: 32),
                CustomTextField(
                  controller: descriptionController,
                  icon: Icons.description_outlined,
                  hint: "Descrição",
                  isTextArea: true,
                ),
                const SizedBox(height: 32),
                GestureDetector(
                  onTap: () => _selectDate(context),
                  child: AbsorbPointer(
                    child: TextFormField(
                      controller: dateController,
                      style: const TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintText: "Data de entrega",
                        hintStyle: const TextStyle(color: Colors.white38),
                        prefixIcon: const Icon(
                          Icons.calendar_today_outlined,
                          color: Colors.white,
                        ),
                        filled: true,
                        fillColor: Colors.white.withOpacity(0.1),
                        border: const OutlineInputBorder(
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 60),
                ElevatedButton(
                  onPressed: () async {
                    final title = titleController.text;
                    final description = descriptionController.text;
                    final date = dateController.text;

                    if (title.isEmpty || description.isEmpty || date.isEmpty) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Por favor, preencha o formulário.'),
                          backgroundColor: Colors.red,
                        ),
                      );

                      return;
                    }

                    final newActivity = ActivityModel(
                      title: title,
                      description: description,
                      date: date,
                    );

                    await store.createActivity(newActivity);

                    if (!store.isLoading.value) {
                      // ignore: use_build_context_synchronously
                      Navigator.pop(context);
                    }
                  },
                  style: const ButtonStyle(
                    fixedSize: MaterialStatePropertyAll(Size(200, 50)),
                    backgroundColor:
                        MaterialStatePropertyAll<Color>(Colors.deepOrange),
                  ),
                  child: const Text(
                    "Criar",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                const SizedBox(height: 30),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
