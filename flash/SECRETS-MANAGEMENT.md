# Secrets Management Guide

## 🔑 GitHub Secrets (for CI/CD)

### Setup Repository Secrets
1. Go to: Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

```
DEPLOY_TOKEN          # Deployment authentication
API_KEY               # External API keys
ENCRYPTION_KEY        # Data encryption key
WEBHOOK_SECRET        # Webhook verification
```

### Access in Workflows
```yaml
- name: Deploy
  env:
    TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

## 🔐 Token Rotation Strategy

### GitHub Personal Access Tokens
- **Create**: Settings → Developer settings → Personal access tokens → Fine-grained tokens
- **Permissions**: Minimal required (read/write specific repos only)
- **Expiration**: 90 days maximum
- **Rotation**: Set calendar reminder 7 days before expiry
- **Storage**: Use password manager (1Password, Bitwarden, LastPass)

### Rotation Schedule
- **API Keys**: Every 90 days
- **Access Tokens**: Every 90 days
- **SSH Keys**: Every 365 days
- **Passwords**: Every 180 days

## 🛡️ Best Practices

1. **Never hardcode secrets** in source code
2. **Use environment variables** for all sensitive data
3. **Encrypt secrets at rest** using tools like:
   - AWS Secrets Manager
   - HashiCorp Vault
   - Azure Key Vault
   - Google Secret Manager
4. **Audit access logs** monthly
5. **Revoke unused tokens** immediately
6. **Use different keys** for dev/staging/production

## 🚨 If Secrets Are Exposed

1. **Immediately revoke** the compromised secret
2. **Generate new secret** and update all systems
3. **Review access logs** for unauthorized usage
4. **Scan git history**: `git log -S "secret_string"`
5. **Use BFG Repo-Cleaner** to remove from history:
   ```bash
   bfg --replace-text passwords.txt repo.git
   ```
6. **Force push** cleaned history (coordinate with team)
7. **Report to GitHub** if needed

## 📱 2FA Backup Codes

- Store in encrypted password manager
- Print and store in secure physical location
- Never store in plain text files
- Test recovery process annually
