services.Configure<CookiePolicyOptions>(options => {
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SamesiteMode.None;
});

services.AddAuthentication(AzureADDefaults.AuthenticationScheme).AddAzureAD(
    options => Configuration.Bind("AzureAD", options)
);

services.Congirue<OpenIdConnectOptions>(AzureADDefaults.OpenIdScheme, options => 
{
    options.Authority = options.Authority + "/v2.0/";
    options.TokenValidationParameters.ValidateIssuer = false;
});
