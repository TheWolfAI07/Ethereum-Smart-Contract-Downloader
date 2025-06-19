import com.intellij.jvm.dfa.analysis.configurator.JvmTaintConfiguratorStorage
import com.intellij.jvm.dfa.analysis.dev.config.TaintConfig
import com.intellij.jvm.dfa.analysis.configurator.taint.rules.TaintRule

TaintConfig(fun JvmTaintConfiguratorStorage.() {
    method("com.google.gson.JsonParser.parseReader") { _ -> { } }
    method("java.lang.Throwable.printStackTrace") { _ -> { } }
})