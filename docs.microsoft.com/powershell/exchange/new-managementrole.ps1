New-ManagementRole -Name "Redmond Journaling View-Only" -Parent Journaling
Get-ManagementRoleEntry "Redmond Journaling View-Only\*" | Where { $_.Name -NotLike "Get*" } | %{Remove-ManagementRoleEntry -Identity "$($_.id)\$($_.name)"}

New-ManagementRole -Name "In-house scripts" -UnScopedTopLevel