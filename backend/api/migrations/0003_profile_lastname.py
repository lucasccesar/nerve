# Generated by Django 4.2.4 on 2023-11-19 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='lastname',
            field=models.CharField(default='', max_length=50),
        ),
    ]