---
footer: false
---

## 1.恢复已删除的分支

第一步 查看 Reflog

```shell
git reflog
```

在输出中，您将看到提交号（commit hash）以及删除分支之前的引用号。记住这个引用号，它将帮助您恢复被删除的分支。

第二步 恢复分支

```shell
git checkout -b dev_xj d9244f1
```

dev_xj：你的分支名，可以和之前删除的一样，也可以重新命个名 d9244f1： 最后一次 commit 的提交号或者引用号

第三步 推送分支

```shell
git push origin dev_xj
```

## 2.回退提交

```shell
# git reset [option]
# --soft 提交记录回退到暂存区
# --mixed 提交记录回退到工作区
# --hard 提交记录全部清除
```

回退代码到某次 commitID

```shell
# 查看 commitID
git log
# 回退到指定 commitID
git reset --hard dcd2bb446afd31e620866b2e49ba05bff108c1de
# 推送本地分支
git push origin dev_xj
```

回退上一次

```shell
git reset --hard HEAD
```

## 查看分支作者

```shell
git for-each-ref --format='%(refname:short) %(authorname)' refs/heads
```

## 统计两个分支的代码行数变化

```shell
git diff master 2024UI02 --shortstat -- ':!folder_to_exclude/' ':!*.pb.h'
# 887 files changed, 12185 insertions(+), 47846 deletions(-)
```
