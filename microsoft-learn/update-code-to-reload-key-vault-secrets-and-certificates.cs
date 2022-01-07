config.AddAzureAppConfiguration(options =>
    {
    options.Connect(settings["ConnectionStrings:AppConfig"])
        .ConfigureKeyVault(kv =>
        {
            kv.SetCredential(new DefaultAzureCredential());
            kv.SetSecretRefreshInterval("TestApp:Settings:KeyVaultCertificate", TimeSpan.FromHours(12));
        });
});