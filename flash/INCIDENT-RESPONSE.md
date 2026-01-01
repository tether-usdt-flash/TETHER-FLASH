# Incident Response Plan

## 🚨 Incident Classification

### Severity Levels

**CRITICAL (P0)** - Immediate action required
- Account takeover
- Data breach
- Malware injection
- Website defacement
- Active exploitation

**HIGH (P1)** - Action within 1 hour
- Unauthorized access detected
- Secret exposed in public repo
- DDoS attack
- Critical vulnerability discovered

**MEDIUM (P2)** - Action within 24 hours
- Suspicious activity detected
- Failed security scan
- Dependency vulnerability
- Unusual traffic patterns

**LOW (P3)** - Action within 1 week
- Minor security warnings
- Outdated dependencies
- Configuration improvements needed

## 📋 Response Procedures

### 1. Secret Exposure (API Key, Token, Password)

**Immediate Actions (Within 5 minutes):**
```bash
# Step 1: Revoke the exposed secret
# - GitHub: Settings → Developer settings → Revoke token
# - API providers: Revoke key in their dashboard

# Step 2: Generate new secret
# - Create replacement immediately
# - Update all systems using the secret

# Step 3: Check for unauthorized usage
# - Review access logs
# - Check for unusual API calls
# - Monitor for data exfiltration
```

**Follow-up Actions (Within 1 hour):**
```bash
# Step 4: Remove from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/secret/file" \
  --prune-empty --tag-name-filter cat -- --all

# Or use BFG Repo-Cleaner (faster)
bfg --replace-text passwords.txt repo.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Step 5: Force push (WARNING: Coordinate with team)
git push origin --force --all
git push origin --force --tags

# Step 6: Notify collaborators
# - Email all team members
# - Update secrets in CI/CD
# - Verify all systems updated
```

**Documentation:**
- Log incident details
- Document timeline
- Record actions taken
- Note lessons learned

### 2. Unauthorized Access

**Immediate Actions:**
```
1. Change GitHub password immediately
2. Revoke all active sessions
3. Review recent activity:
   - Settings → Security log
   - Check commits, PRs, issues
   - Review repository settings changes
4. Enable 2FA if not already active
5. Revoke all personal access tokens
6. Remove suspicious collaborators
7. Check webhook configurations
8. Review deploy keys
```

**Investigation:**
```
- Check IP addresses in security log
- Review commit signatures
- Audit repository changes
- Check for backdoors in code
- Scan for malicious commits
```

**Recovery:**
```
- Restore from clean backup if needed
- Re-secure all credentials
- Implement additional security measures
- Monitor for 30 days
```

### 3. Malware/Code Injection

**Immediate Actions:**
```
1. Take website offline (if live)
2. Identify malicious commits:
   git log --all --oneline --graph
3. Revert to last known good commit:
   git revert <commit-hash>
4. Scan all files for malware
5. Review all recent changes
6. Check for backdoors
```

**Cleanup:**
```bash
# Scan for suspicious patterns
grep -r "eval(" .
grep -r "base64_decode" .
grep -r "exec(" .
grep -r "system(" .

# Check for hidden files
find . -name ".*" -type f

# Verify file integrity
git diff <last-good-commit> HEAD
```

### 4. DDoS Attack

**Immediate Actions:**
```
1. Enable Cloudflare (free tier)
2. Implement rate limiting
3. Block malicious IPs
4. Contact hosting provider
5. Monitor traffic patterns
```

**Mitigation:**
```
- Use CDN (Cloudflare, Fastly)
- Implement CAPTCHA
- Enable bot protection
- Scale infrastructure if needed
```

### 5. GitHub Account Suspension

**Immediate Actions:**
```
1. Read suspension notice carefully
2. Contact GitHub Support:
   - Email: support@github.com
   - Explain situation professionally
   - Provide requested information
3. Access local backups
4. Push to alternative git host (GitLab/Bitbucket)
5. Continue development from backup
```

**Prevention:**
```
- Follow GitHub Terms of Service
- Avoid automated scraping
- Don't abuse API rate limits
- Maintain educational disclaimers
- Respond to DMCA notices promptly
```

## 📞 Contact Information

### Emergency Contacts
```
GitHub Support: support@github.com
Hosting Provider: [your-host-support]
Domain Registrar: [your-registrar-support]
Security Team: [your-email]
```

### External Resources
```
GitHub Security: https://github.com/security
CERT: https://www.cisa.gov/report
Have I Been Pwned: https://haveibeenpwned.com
```

## 📝 Incident Log Template

```markdown
## Incident Report: [YYYY-MM-DD]

**Severity**: [P0/P1/P2/P3]
**Type**: [Secret Exposure/Unauthorized Access/Malware/DDoS/Other]
**Detected**: [Date/Time]
**Resolved**: [Date/Time]

### Timeline
- HH:MM - Incident detected
- HH:MM - Initial response
- HH:MM - Containment
- HH:MM - Resolution

### Impact
- [Describe impact]

### Root Cause
- [Describe cause]

### Actions Taken
1. [Action 1]
2. [Action 2]

### Prevention Measures
1. [Measure 1]
2. [Measure 2]

### Lessons Learned
- [Lesson 1]
- [Lesson 2]
```

## 🔄 Post-Incident Review

**Within 48 hours of resolution:**
1. Document complete timeline
2. Analyze root cause
3. Identify prevention measures
4. Update security procedures
5. Train team on lessons learned
6. Implement improvements
7. Schedule follow-up review (30 days)

## 🛡️ Prevention Checklist

After any incident, verify:
- [ ] All credentials rotated
- [ ] 2FA enabled on all accounts
- [ ] Security scanning active
- [ ] Backups verified
- [ ] Monitoring enhanced
- [ ] Team notified and trained
- [ ] Documentation updated
- [ ] Similar vulnerabilities patched
