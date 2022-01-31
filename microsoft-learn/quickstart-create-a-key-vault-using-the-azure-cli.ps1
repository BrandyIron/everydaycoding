az group create --name "myResourceGroup" -l "EastUS"
az keyvault create --name "<your-unique-keyvault-name>" --resource-group "myResourceGroup" --location "EastUS"

az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "MyPassword" --value "<value>"
az keyvault key create --vault-name "<your-unique-keyvault-name>" --name "MyPassword" --protection software

az keyvault secret show --name MyPassword --vault-name <your-unique-keyvault-name> --query value --output tsv