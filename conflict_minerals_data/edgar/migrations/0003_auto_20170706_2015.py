# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-07 03:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('edgar', '0002_auto_20170704_2325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='edgarsdfiling',
            name='accepted',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='edgarsdfiling',
            name='company',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='edgar.EdgarCompanyInfo'),
        ),
        migrations.AlterField(
            model_name='edgarsdfiling',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='edgarsdfiling',
            name='link',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='edgarsdfiling',
            name='n_documents',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
