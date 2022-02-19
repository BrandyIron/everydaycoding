New-ManagementRoleAssignment -Role "Mail Recipients" -SecurityGroup "Tier 2 Help Desk"

Get-ManagementRole "MyVoiceMail" | Format-Table Name, IsEndUserRole
New-ManagementRoleAssignment -Role "MyVoiceMail" -Policy "Sales end-users"

New-ManagementRoleAssignment -Role "End Help Desk" -SecurityGroup "End HD Personnel" -RecipientOrganizationalUnitScope contoso.com/Engineering/Users

New-ManagementRoleAssignment -Role "Distribution Groups" -SecurityGroup "North America Exec Assistants" -CustomRecipientWriteScope "North America Recipients"

New-ManagementRoleAssignment -Name "Exchange Servers_John" -Role "Exchange Servers" -User John -CustomConfigWriteScope "Sydney Servers"

New-ManagementRoleAssignment -Name "Exec-Mail Recipients_Executive Administrators" -Role "Mail Recipients" -SecurityGroup "Executive Administrators" -ExclusiveRecipientWriteScope "Exclusive-Executive Recipients"

New-ManagementRoleAssignment -Name "Mail Recipients_Contoso Seattle" -Role "Mail Recipients" -SecurityGroup "Contoso Sub - Seattle" -CustomConfigWriteScope "Contoso Databases" -RecipientOrganizationalUnitScope adatum.com/Contoso/Seattle/Users

