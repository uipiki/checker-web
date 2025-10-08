import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1>プライバシーポリシー</h1>
        <p className="last-updated">最終更新日: 2025年10月5日</p>

        <section>
          <h2>1. はじめに</h2>
          <p>
            Prize Checker Now（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の適切な取扱いに努めます。
            本プライバシーポリシーは、当サイトにおける情報の収集・利用・保護に関する方針を説明するものです。
          </p>
        </section>

        <section>
          <h2>2. 収集する情報</h2>
          <p>当サイトでは、以下の情報を記録します：</p>
          <ul>
            <li>選択したトーナメント情報</li>
            <li>入力したエントリ数</li>
          </ul>
          <p>これらの情報は統計分析のためにのみ使用され、個人を特定する情報は収集しません。</p>
          <p>また、当サイトのホスティングサービス（Vercel）等が技術的にアクセスログを保持する場合がありますが、当サイト運営者はその情報にアクセスいたしません。</p>
        </section>

        <section>
          <h2>3. Cookieの使用</h2>
          <p>
            当サイトでは、利便性向上および利用状況の分析のためにCookieを使用します。
            Cookieは、ブラウザ設定により無効化することができます。ただし、一部機能が利用できなくなる場合があります。
          </p>
        </section>

        <section>
          <h2>4. Google AdSenseについて</h2>
          <p>
            当サイトでは、広告配信サービス「Google AdSense」を使用しています。
            GoogleはCookie等を用いてユーザーの興味に応じた広告を配信することがあります。
          </p>
          <p>
            Cookieを無効にする方法や、Google AdSenseのプライバシーポリシーについては、
            <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">
              Googleの広告ポリシー
            </a>
            をご覧ください。
          </p>
        </section>

        <section>
          <h2>5. 情報の使用目的</h2>
          <p>収集した情報は、以下の目的で使用します：</p>
          <ul>
            <li>サービスの提供と改善</li>
            <li>利用状況の分析</li>
            <li>広告の配信</li>
            <li>不正行為の防止</li>
          </ul>
        </section>

        <section>
          <h2>6. 情報の第三者提供</h2>
          <p>
            当サイトは、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
            ただし、以下のサービスを利用しています：
          </p>
          <ul>
            <li>Google AdSense（広告配信）</li>
            <li>Vercel（ホスティング）</li>
          </ul>
        </section>

        <section>
          <h2>7. セキュリティ</h2>
          <p>
            当サイトは、収集した情報の漏洩、紛失、または不正アクセスを防ぐため、
            適切なセキュリティ対策を講じています。
          </p>
        </section>

        <section>
          <h2>8. プライバシーポリシーの変更</h2>
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じます。
          </p>
        </section>

        <section>
          <h2>9. お問い合わせ</h2>
          <p>
            本プライバシーポリシーに関するお問い合わせは、
            以下のフォームからお願いいたします。
          </p>
          <p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScgwUW_Mht79FXYvuLwh-wmN0qIEVJ54BTmydOHfM4L1GHDXw/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              お問い合わせフォーム
            </a>
          </p>
        </section>

        <div className="back-link">
          <a href="/">トップページに戻る</a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
