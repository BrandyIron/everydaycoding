# create a new user
az ad user create

New-AzureADUser

$invitations = import-csv c:\bulkinvite\invitations.csv

$messageInfo = New-Object Microsoft.Open.MSGraph.Model.InvitedUserMessageInfo

$messageInfo.customizedMessageBody = "Hello. You are invited to the Contoso organization."

foreach ($email in $invitations) {
        New-AzureADMSInvitation -InvitedUserEmailAddress $email.InvitedUserEmailAddress -InvitedUserDisplayName $email.Name -InvitedRedirectUrl https://myapps.microsoft.com -InvitedUserMessageInfo $messageInfo -SendInvitationMessage $true
}

Remove-AzureADUser
az ad user delete

