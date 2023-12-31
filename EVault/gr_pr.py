from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

# Define your groups
group_names = ['Client', 'Lawyer', 'Clerk','Judge']

# Get all permissions
all_permissions = Permission.objects.all()

# Iterate over group names and create groups with all permissions
for group_name in group_names:
        # Create the group
        group, created = Group.objects.get_or_create(name=group_name)

        # Assign all permissions to the group
        group.permissions.set(all_permissions)
        group.save()

        print(f"Group '{group_name}' created and assigned all permissions.")

print("Script executed successfully.")