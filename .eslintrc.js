module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // プラグインはインストールして読み込んだだけだとなにもルールが適用されないのでここで設定する
    // 各順番によって衝突したルールが上書きされるので書き順はかなり重要
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks', // 追加
    'plugin:import/errors', // 追加
    'plugin:import/typescript', // 追加
    'plugin:@typescript-eslint/recommended', // 追加 "plugin:react/recommended"　"airbnb"　より下に書く
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // 追加
    'prettier', // 追加 自動校正 他のルール設定を上書きして調整するものなのでかならず最後に書く
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './**/tsconfig.eslint.json', // 追加 TSのコンプアイルのパスを教えるために必要 あとでこのファイルを作る
    // ↑ルートディレクトリより下に更にフォルダを作る場合は./**/~とようにしないとエラーになってしまう
    sourceType: 'module',
    tsconfigRoorDir: __dirname, // 追加
  },
  plugins: [
    // 読み込ませる追加ルールのプラグインを記述する これなしでyarn addしても動かない ここに書いて初めてルールが有効となる
    'react',
    'import', // 追加
    'jsx-a11y', // 追加
    // 'prefer-arrow', // 追加 いつの間にか追加されていたので削除
    'react-hooks', // 追加
    '@typescript-eslint',
  ],
  root: true, // 追加
  rules: {
    // 各ルールの適用の可否やエラーレベルを設定する

    // 定義前の変数の使用を禁じるEslintとtypescript ESLintのルール
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // クラスメンバーの定義の間に空行を入れるかどうかを定義
    // 1行記載のメンバーは空行を入れなくていいようにする
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],

    // void演算子の使用を禁ずる
    // ただしEffect Hookでvoidを記述する必要がある(TSLint no-floating-promises)ので文のみ許可
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],

    // 任意の構文の間に区切りの空行を入れるかどうかを定義するルール
    // return文の前は空行を入れるようにしている。
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],

    // 使用していない変数の定義を許さないルール。 ただし変数名を _ にしたときだけは許す
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '_',
        ignoreRestSiblings: false,
        varsIgnorePattern: '_',
      },
    ],

    //  インポートのときのファイル拡張子を記述するか定義するルール
    // npmパッケージは無視
    // js,jsx,ts,tsxについて, 拡張子を省略し、他のファイルは記述させるように設定
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // JSXの拡張子を制限するルール
    // eslint-config-airbnbで.jsxのみに限定されてしまっているので.tsxを追加する
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],

    // JSXでコンポーネントを呼ぶときにpropsの記述にスプレッド構文を許さないルール
    // eslint-config-airbnbにてすべて禁止されているが、<Foo { ... { bar, baz } /}>のように個々のpropsを明記する書き方のみ許容する設定
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
      },
    ],

    // JSX記述を使用するときにreactモジュールをReactとしてimportすることを強制するルール
    // しかし新しいJSX変換形式ではインポートが不要になるのでこの設定を無効化する
    'react/react-in-jsx-scope': 'off',

    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreVoid: true,
        ignoreIIFE: false,
      },
    ],

    // よくわからんしバグるので削除 いついれたの・・・
    // 'prefer-arrow/prefer-arrow-functions': [
    //   'error',
    //   {
    //     disallowPrototype: true,
    //     singleReturnOnly: false,
    //     classPropertiesAllowed: false,
    //   },
    // ],
  },

  // overridesは任意のglobパターンにマッチするファイルのみルールの適用を上書きできるプロパティ
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        // コンポーネントのpropsにpropsTypesプロパティの定義を強制するルール
        // eslint-config-aorbnbで設定されているがTSの場合は不要なので拡張子が.tsxの場合は無効にするように設定に上書き
        'react/prop-types': 'off',
      },
    },
  ],

  // settingsは任意の実行ルールに適用する追加の共有設定
  // tsconfigでsrc/配下のファイルの絶対パスを指定できるようにしていたがこのままではエラーになる(eslint-plugin-import)
  // 解決策としてそのlintの解決プラグインに対してパスにsrcを追加している
  settings: {
    'import/resolver': {
      node: {
        paths: [''],
      },
    },
  },
};
