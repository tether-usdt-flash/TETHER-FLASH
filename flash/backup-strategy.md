# Backup & Recovery Strategy

## 📦 What to Backup

### Code Repository
- ✅ Full git repository (already on GitHub)
- ✅ All branches
- ✅ Release tags
- ✅ GitHub Issues/Wiki (if used)

### Configuration
- ✅ Environment variables (encrypted)
- ✅ Server configurations
- ✅ SSL certificates
- ✅ DNS records documentation

### Data
- ✅ Database (if applicable)
- ✅ User uploads (if applicable)
- ✅ Logs (last 90 days)

## 🔄 Backup Schedule

### Automated Backups
```
Daily:
  - Database snapshots (if applicable)
  - Application logs
  - Retention: 7 days

Weekly:
  - Full repository clone
  - Configuration files
  - Retention: 4 weeks

Monthly:
  - Complete system backup
  - Archive important releases
  - Retention: 12 months
```

## 🛠️ Backup Methods

### 1. GitHub Repository Backup

**Manual Method:**
```bash
# Clone with all branches
git clone --mirror https://github.com/username/repo.git
cd repo.git
git bundle create ../repo-backup-$(date +%Y%m%d).bundle --all

# Store bundle file in secure location
```

**Automated Script (backup-repo.sh):**
```bash
#!/bin/bash
REPO_URL="https://github.com/username/repo.git"
BACKUP_DIR="$HOME/backups/github"
DATE=$(date +%Y%m%d)

mkdir -p "$BACKUP_DIR"
cd "$BACKUP_DIR"
git clone --mirror "$REPO_URL" "repo-$DATE.git"
tar -czf "repo-$DATE.tar.gz" "repo-$DATE.git"
rm -rf "repo-$DATE.git"

# Keep only last 30 days
find "$BACKUP_DIR" -name "repo-*.tar.gz" -mtime +30 -delete
```

### 2. Configuration Backup

**Create encrypted backup:**
```bash
# Backup .env and configs
tar -czf config-backup.tar.gz .env* *.conf
gpg --symmetric --cipher-algo AES256 config-backup.tar.gz
rm config-backup.tar.gz

# Store config-backup.tar.gz.gpg securely
```

### 3. Cloud Backup Solutions

**Recommended Services:**
- **GitHub**: Primary (automatic)
- **GitLab/Bitbucket**: Mirror repository (free)
- **AWS S3**: Encrypted backups (pay-as-you-go)
- **Backblaze B2**: Cost-effective cloud storage
- **Google Drive/Dropbox**: Encrypted archives

## 🔐 Backup Security

### Encryption
- Encrypt all backups with GPG or AES-256
- Store encryption keys separately
- Use strong passphrases (20+ characters)

### Storage Locations (3-2-1 Rule)
1. **3 copies** of data
2. **2 different media types**
3. **1 offsite backup**

Example:
- Primary: GitHub
- Secondary: Local encrypted backup
- Tertiary: Cloud storage (encrypted)

## 🧪 Recovery Testing

### Quarterly Recovery Drills
```bash
# Test repository restore
git clone backup-file.bundle test-restore
cd test-restore
git log --oneline -10  # Verify history

# Test configuration restore
gpg --decrypt config-backup.tar.gz.gpg | tar -xzf -
# Verify files are intact
```

### Recovery Checklist
- [ ] Clone repository from backup
- [ ] Restore configuration files
- [ ] Verify all branches present
- [ ] Check commit history integrity
- [ ] Test application startup
- [ ] Validate data integrity
- [ ] Document recovery time

## 🚨 Disaster Recovery Plan

### If Repository is Compromised
1. **Immediately**: Revoke all access tokens
2. **Restore**: From latest clean backup
3. **Audit**: Review all commits since last backup
4. **Secure**: Change all credentials
5. **Monitor**: Enhanced monitoring for 30 days

### If GitHub Account is Suspended
1. **Contact**: GitHub Support immediately
2. **Access**: Use local git bundles
3. **Mirror**: Push to alternative git host (GitLab/Bitbucket)
4. **Continue**: Development from backup
5. **Resolve**: Work with GitHub to restore access

### Recovery Time Objectives (RTO)
- Critical: 1 hour
- High: 4 hours
- Medium: 24 hours
- Low: 1 week

### Recovery Point Objectives (RPO)
- Code: 0 (git history)
- Configuration: 24 hours
- Data: 24 hours
